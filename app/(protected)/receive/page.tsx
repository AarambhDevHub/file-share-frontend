import { receive_file_list } from "@/action/fileHandler";
import { Receive } from "./components/Receive";
import { auth } from "@/auth";


const ReceivePage = async ({ 
    searchParams 
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const fileData = await receive_file_list({
        page: Number(searchParams.page) || 1,
        limit: Number(searchParams.limit) || 10,
    });
    const session = await auth();
    return (
        <div className="p-4">
             <Receive data={fileData.files} total={fileData.results} token={session?.user.accessToken || null} />
        </div>
    )
}

export default ReceivePage;