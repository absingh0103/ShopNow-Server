import React from "react";

const SizeGuidePage = ({ setSelectSizeGuide }) => {
  const handleCloseSizeGuide = () => {
    setSelectSizeGuide(false);
  };

  return (
    <>
      <div
        class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
        id="modal-id"
      >
        <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
        <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
          <div class="">
            <div class="text-center p-5 flex-auto justify-center">
              <img
                src="../sizechat.png"
                alt="size chat"
                className="w-16 h-16 flex items-center mx-auto"
              />
              <h2 class="text-xl font-bold py-4 ">Size Chart</h2>
              <div className="container p-2 mx-auto sm:p-4 ">
                <div className="overflow-x-auto py-2">
                  <table className="w-full p-6 text-xs text-left whitespace-nowrap">
                    <colgroup>
                      <col className="w-5" />
                      <col />
                      <col />
                      <col />
                      <col />
                      <col />
                      <col className="w-5" />
                    </colgroup>
                    <thead>
                      <tr className="dark:bg-gray-700">
                        <th className="p-3">General Size</th>
                        <th className="p-3">Neck</th>
                        <th className="p-3">Chest</th>
                        <th className="p-3">Sleeve Length</th>
                      </tr>
                    </thead>
                    <tbody className="border-b ">
                      <tr>
                        <td className="px-3 text-2xl font-medium ">S</td>
                        <td className="px-3 py-2">
                          <p>14.14.5 inches 35.5-37 cm</p>
                        </td>
                        <td className="px-3 py-2">
                          <span>34-36 inches 86-91 cm</span>
                        </td>
                        <td className="px-3 py-2">
                          <p>31.5-32 inches 80-81 cm</p>
                        </td>
                      </tr>
                    </tbody>
                    <tbody className="border-b ">
                      <tr>
                        <td className="px-3 text-2xl font-medium ">M</td>
                        <td className="px-3 py-2">
                          <p> 15-15.5 inches 38-39.5 cm</p>
                        </td>
                        <td className="px-3 py-2">
                          <span>38-40 inches 96-101 cm </span>
                        </td>
                        <td className="px-3 py-2">
                          <p>32.5-33 inches 82.5-84 cm</p>
                        </td>
                      </tr>
                    </tbody>
                    <tbody className="border-b ">
                      <tr>
                        <td className="px-3 text-2xl font-medium ">L</td>
                        <td className="px-3 py-2">
                          <p>16-16.5 inches 40.5-42 cm</p>
                        </td>
                        <td className="px-3 py-2">
                          <span>42-44 inches 107-111 cm</span>
                        </td>
                        <td className="px-3 py-2">
                          <p> 33.5-34 inches 85-86.5 cm</p>
                        </td>
                      </tr>
                    </tbody>
                    <tbody className="border-b ">
                      <tr>
                        <td className="px-3 text-2xl font-medium ">XL</td>
                        <td className="px-3 py-2">
                          <p>17-17.5 inches 43-44.5 cm </p>
                        </td>
                        <td className="px-3 py-2">
                          <span>46-48 inches 117-122 cm</span>
                        </td>
                        <td className="px-3 py-2">
                          <p> 34.5-35 inches 87.5-89 cm</p>
                        </td>
                      </tr>
                    </tbody>
                    <tbody className="border-b  ">
                      <tr>
                        <td className="px-3 text-2xl font-medium ">XXL</td>
                        <td className="px-3 py-2">
                          <p> 18-18.5 inches 45.5-47 cm </p>
                        </td>
                        <td className="px-3 py-2">
                          <span>50-52 inches 127-132cm </span>
                        </td>
                        <td className="px-3 py-2">
                          <p> 35.5-36 inches 90-91.5 cm</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="p-3  mt-2 text-center space-x-4 md:block">
              <button
                className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
                onClick={handleCloseSizeGuide}
              >
                back&rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SizeGuidePage;
