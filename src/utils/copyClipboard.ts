import { toast } from "react-hot-toast";

export function copyClipboard(text) {
    if (text !== null || text !== undefined) {
        navigator.clipboard.writeText(text);
        toast.success('Copied success!')
    }
    
}