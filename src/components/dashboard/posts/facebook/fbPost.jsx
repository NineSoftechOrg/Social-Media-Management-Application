import FbPostEditor from './fbPostEditor';
import FbLayout from './fbLayout';
import FbSidebar from './fbSidebar';
const FbPost = () => {
  return (
    <FbLayout>
      <div className="flex">
        <div className="w-1/3">
          <FbSidebar />
        </div>
        <div className="w-2/3">
          <FbPostEditor />
        </div>
      </div>
    </FbLayout>
  );
};

export default FbPost;