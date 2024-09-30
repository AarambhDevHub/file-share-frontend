import { send_file_list } from "@/action/fileHandler";
import { Upload } from "./components/Upload";

const UploadPage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const fileData = await send_file_list({
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 10,
  });

  return (
    <div className="p-4">
      <Upload data={fileData.files} total={fileData.results} />
    </div>
  );
};

export default UploadPage;
