import { FaFilePdf, FaFileAlt, FaFileCode, FaFileWord, FaFileExcel, FaFileImage, FaFileArchive, FaFile } from 'react-icons/fa';

export function getIconByExtension(filename: string) {
  const ext = filename.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'pdf':
      return <FaFilePdf className="text-red-500" />;
    case 'txt':
      return <FaFileAlt className="text-gray-600" />;
    case 'js':
    case 'ts':
    case 'jsx':
    case 'tsx':
      return <FaFileCode className="text-yellow-500" />;
    case 'doc':
    case 'docx':
      return <FaFileWord className="text-blue-600" />;
    case 'xls':
    case 'xlsx':
      return <FaFileExcel className="text-green-600" />;
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
      return <FaFileImage className="text-purple-400" />;
    case 'zip':
    case 'rar':
      return <FaFileArchive className="text-orange-500" />;
    default:
      return <FaFile className="text-gray-400" />;
  }
}
