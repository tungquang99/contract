import React, { useState, useEffect } from 'react';
import { useContractRead, useContractReads, useNetwork } from 'wagmi';
import { ethers } from 'ethers';
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { contractInterfacePROTOCOL } from '../../constants/constants';
import { PROTOCOL } from '../../contracts/abi';
import Input from '../TextField';


const ReadContract = ({type}) => {
    const [funcArray, setFuncArray] = useState([])
    const [dataFunc, setDataFunc] = useState([])
    const [funcName, setFuncName] = useState('')
    const [contractView, setContractView] = useState([])
    const [dataView, setDataView] = useState([])
    const [contractFunc, setContractFunc] = useState([])
    const [initArg, setInitArg] = useState([])
    const [arg, setArg] = useState([])
    const [config, setConfig]: any = useState({})
    const { chain } = useNetwork()
    
    const { data:viewData, isError:errorView, isLoading:loadingView } = useContractReads({ contracts: funcArray})
    const { data:funcData, isError:errorFunc, isLoading:loadingFunc, refetch } = useContractRead(config)

    useEffect(() => {
        console.log(chain);
        
        const contractArr = PROTOCOL.filter((item: any) => (item.type === 'function' || item.type === 'event') && item?.stateMutability === type)
        setContractView(contractArr.filter(item => item.inputs.length <= 0))
        setContractFunc(contractArr.filter(item => item.inputs.length > 0))
    }, [type, chain]);

    useEffect(() => {
        setFuncArray([])
        if (contractView?.length > 0) {
            for (let i = 0; i < contractView?.length; i++) {
                setFuncArray(prev => [...prev, ...[{
                    ...contractInterfacePROTOCOL,
                    functionName: contractView[i]?.name
                }]])
            }
        }
    }, [contractView])

    useEffect(() => {
        setDataFunc([])
        setInitArg([])
        if (contractFunc?.length > 0) {
            const dataFuncArr = {}
            contractFunc.map(contract => {
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
    }, [contractFunc])


    useEffect(() => {   
        setDataView(viewData)
        console.log(viewData);
    }, [funcArray])
    

    const hanldeInput = (e, type, idx) => {
        const values = [...initArg]
        values[idx][e.target.name] = e.target.value
        setArg(values)
    }

    const handleFunction = async (func_name, idx) => {
        setConfig({
            ...contractInterfacePROTOCOL,
            functionName: func_name,
            args: Object.values(arg[idx])
        })
        
        setFuncName(func_name)
        await refetch();
    }

    useEffect(() => {
        if (funcName !== '') {
            setDataFunc((prev) => {
                prev[0][funcName] = funcData
                return prev
            })
        }
    }, [funcName])

    return (
        <div>
        {
            contractFunc?.length > 0 && contractFunc.map((contract: any, idx) => (
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
                        {
                            contract?.inputs.map((item: any, index: any) => {
                                return (
                                    <div key={index} style={{marginBottom: '10px', width: '100%'}}>
                                    <Input data={item} input={initArg} name={contract?.name} onChange={hanldeInput} idx={idx} />
                                    </div>
                                )
                            })
                        }
                        <Button variant="contained" onClick={() => handleFunction(contract?.name, idx)}>Read</Button>
                        {dataFunc.length > 0 && <AccordionDetails>
                            <a href="#"> Result: 
                                <span style={{color: '#1E79D3', marginLeft: '8px'}}>{typeof dataFunc[0][contract?.name] === 'object' ? 
                                ethers.utils.formatUnits(dataFunc[0][contract?.name]) : dataFunc[0][contract?.name]?.toString()}</span>
                            </a>
                    </AccordionDetails> }
                    </AccordionDetails>  
                </Accordion>
            ))
        }
         {
            contractView?.length > 0 && contractView.map((contract: any, idx) => (
                <Accordion key={idx}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{idx + 1 + contractFunc?.length}. {contract?.name}</Typography>
                    </AccordionSummary>
                    <Divider light />
                    {dataView?.length > 0 && dataView[idx] !== null && <AccordionDetails>
                        <a href="#"> Result: 
                            <span style={{color: '#1E79D3', marginLeft: '8px'}}>
                                {
                                   Array.isArray(dataView[idx]) ? dataView[idx].toString() : typeof dataView[idx] === 'object' && !Array.isArray(dataView[idx])  ? 
                                   ethers.utils.formatUnits(dataView[idx], 0) : 
                                   dataView[idx]?.toString()
                                }
                               
                            </span>
                        </a>
                    </AccordionDetails> }
                </Accordion>
            ))
        }
    </div>
    );
};

export default ReadContract;