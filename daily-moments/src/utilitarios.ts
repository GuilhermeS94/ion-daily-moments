export function formatarDataParaView(isoString){
    return new Date(isoString).toLocaleDateString();
}