export interface AuthAlertData {
    title:string,
    http_code:number,
    auth_data: {
        title_message: string,
        username:string,
        message:string
    }
}
