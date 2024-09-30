import { auth } from "@/auth";
import { UploadNew } from "./components/UploadNew";

const UploadNewPage = async () => {
    const session = await auth();
    return (
        <div className="p-4">
            <UploadNew token={session?.user.accessToken || null} />
        </div>
    )
}

export default UploadNewPage;