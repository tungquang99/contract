import React, { useState, useEffect } from 'react';
import { Accordion, TextField } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ethers } from 'ethers';
import { useAccount, useContractWrite, usePrepareContractWrite, useSignMessage } from 'wagmi';
import { PROTOCOL } from '../../contracts/abi';
import { contractInterfacePROTOCOL } from '../../constants/constants';
import Input from '../TextField';


const WriteContract = ({type}) => {
    const [contracts, setContracts] = useState([])
    const [initArg, setInitArg] = useState([])
    const [arg, setArg] = useState([])
    const [dataFunc, setDataFunc] = useState([])
    const [funcName, setFuncName] = useState('')
    const [configWrite, setConfigWrite]: any = useState({})
    const [isResult, setIsResult] = useState(false)
    const { address, isConnecting, isDisconnected } = useAccount()
    const { config, status } = usePrepareContractWrite(configWrite);

    const { data, isLoading, isSuccess, writeAsync } = useContractWrite(config)
    const { data:signMess, isError, isLoading:isLoadingSignMess, isSuccess:isSuccessSignMess, signMessage } = useSignMessage({
        message: address,
      })

    useEffect(() => {
        setContracts(
          PROTOCOL.filter((item: any) => (item.type === 'function' || item.type === 'event') && item.stateMutability === type)
        );  
    }, [type]);


    useEffect(() => {
        setDataFunc([])
        setInitArg([])
        if (contracts?.length > 0) {
            const dataFuncArr = {}
            contracts.map(contract => {
                dataFuncArr[contract?.name] = ''
                const obj = {};
                contract.inputs.map(item => {
                    obj[item?.name  === '' ? contract?.name : item?.name] = ''
                    return obj
                    
                })
                setInitArg(prev => [...prev, ...[obj]])
            })
            setDataFunc(prev => [...prev, ...[dataFuncArr]])
        }
    }, [contracts])

    
    const hanldeInput = (e, type, idx) => {
        const values = [...initArg]
        values[idx][e.target.name] = convertValue(type, e.target.value, e.target.type)
        setArg(values)
    }

    function convertValue(type, value, type_input) {
        return type === 'address[]' || type === 'uint256[]' ||type === 'bool[]' || type === 'uint8[]'  ?  value.split(',') : value
        // type === 'uint256' ||type === 'unit64' || type === 'uint8' ? Number(value) : 
    }

    
    const handleFunction = async (func_name, idx) => {
        setIsResult(false)
        setConfigWrite({
            ...contractInterfacePROTOCOL,
            functionName: func_name,
            args: arg[idx] !== undefined ? Object.values(arg[idx]): []
        })   
        setFuncName(func_name)
        // signMessage()
    }
    
    useEffect(() => {
        if (funcName !== '') {
            setDataFunc((prev) => {
                prev[0][funcName] = data
                return prev
            })
        }
    }, [funcName])

    useEffect(() => {
        console.log(configWrite);
        console.log(isSuccessSignMess);
        writeAsync?.()
        .then(resultExec => {
            resultExec
                .wait()
                .then(resultTrans => {
                    console.log(resultTrans, "___ request response trans ____")
                    setIsResult(false)
                })
                .catch(error => {
                    setDataFunc((prev) => {
                        prev[0][funcName] = error.toString()
                        return prev
                    })
                    console.log(error, "Error!!!")
                    setIsResult(true)
                })
                setConfigWrite(contractInterfacePROTOCOL)
        })
        .catch(error => {
            setDataFunc((prev) => {
                prev[0][funcName] = error.toString()
                return prev
            })
            console.log(error, "Error!!!")
            setIsResult(true)
            setConfigWrite(contractInterfacePROTOCOL)
        })
        // if (isSuccessSignMess) {
        // }
    }, [configWrite])
    

    return (
        <>
            <div className="mt-5">
                {
                    contracts?.length > 0 && contracts.map((contract: any, idx) => (
                        <Accordion key={idx}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{idx + 1}. {contract?.name}</Typography>
                            </AccordionSummary>
                            <Divider light />
                            <AccordionDetails>
                                {contract?.inputs &&
                                    contract?.inputs?.length > 0 &&
                                    contract?.inputs.map((item: any, index: any) => (
                                    <div key={index} style={{marginBottom: '10px', width: '100%'}}>
                                        <Input data={item} input={initArg} name={contract?.name} onChange={hanldeInput} idx={idx} />
                                    </div>
                                ))}
                                <Button variant="contained" onClick={() => handleFunction(contract?.name, idx)}>Test</Button>
                                {dataFunc.length > 0 && <AccordionDetails>
                                        <a href="#"> Result: 
                                            {
                                            isResult ?  <span style={{color: 'crimson', marginLeft: '8px'}}>{dataFunc[0][contract?.name]?.toString()}</span> : 
                                            <span style={{color: '#1E79D3', marginLeft: '8px'}}>
                                                {
                                                Array.isArray(dataFunc[idx]) ? dataFunc[idx].toString() : 
                                                typeof dataFunc[0][contract?.name] === 'object' && !Array.isArray(dataFunc[idx]) ? ethers.utils.formatUnits(dataFunc[0][contract?.name]) : 
                                                dataFunc[0][contract?.name]?.toString()
                                                }
                                            </span>
                                            }
                                        </a>
                                </AccordionDetails> }
                            </AccordionDetails>
                        </Accordion>
                    ))
                }
            </div>
        </>
    );
};

export default WriteContract;