import {
  Fragment,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import video from "../api/endpoint/video";

const Player = forwardRef(({}, ref) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [played, setPlayed] = useState(0);

  useEffect(() => {
    setPlayed(0);
  }, [data]);

  useEffect(() => {
    if (!show) {
      setData(null);
    }
  }, [show]);

  useImperativeHandle(
    ref,
    () => ({
      open: (id) => {
        setShow(true);
        video(id).then((data) => {
          setData(data);
        });
      },
    }),
    []
  );

  return (
    <Fragment>
      {show && (
        <div className="bg-black bg-opacity-50 fixed top-0 left-0 w-full h-screen z-10">
          <button
            type="button"
            onClick={() => setShow(false)}
            className="h-16 w-full flex justify-center items-center text-white text-sm"
          >
            <RiCloseCircleLine className="mr-2 text-lg" /> TUTUP
          </button>
        </div>
      )}
      <div
        className={`bg-white rounded-t-xl p-8 fixed top-16 bottom-0 left-0 w-full z-10 transition duration-500 transform ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-full h-full flex flex-col lg:flex-row items-start lg:items-stretch">
          <div className="w-full lg:w-auto lg:flex-1 mr-5 overflow-hidden rounded-lg">
            {data && (
              <iframe
                src={data[played]?.url}
                width="100%"
                height="100%"
                allowFullScreen
              />
            )}
          </div>
          <div className="h-auto lg:h-full mt-5 lg:mt-0 overflow-auto flex-shrink-0 flex flex-wrap justify-center items-start lg:block w-full lg:w-64">
            {data?.map((item, index) => (
              <button
                type="button"
                onClick={() => setPlayed(index)}
                key={`${index}`}
                className={`w-auto lg:w-full py-3 px-5 text-left mb-3 mr-3 lg:mr-0 border rounded ${
                  played === index
                    ? "bg-gray-700 text-white border-transparent"
                    : "border-gray-300"
                }`}
              >
                {item.server}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export default Player;
