import { useState } from 'react'
import background from './assets/cat2.jpg'

function App() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("business");

  const handleSubmit = async () => {
    if (name !== "") {
      localStorage.setItem("name", name);
      setSubmitted(true);
    }
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  }

  return (
    <>
      <div className="flex flex-col h-screen items-center justify-center relative" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {submitted ? (
          // <h1>Target Net Worth</h1>
          <div className="w-1/2 border border-gray-300 rounded-lg shadow bg-white border-gray-300">
            <ul className="hidden text-lg font-semibold text-center text-gray-700 divide-x divide-gray-300 rounded-lg sm:flex dark:divide-gray-300 dark:text-gray-700 rtl:divide-x-reverse" id="fullWidthTab" data-tabs-toggle="#fullWidthTabContent" role="tablist">
              <li className="w-1/2">
                <button onClick={() => handleTabClick("business")} type="button" role="tab" aria-controls="business" aria-selected={activeTab === "business"} className={`inline-block w-full p-4 rounded-ss-lg ${activeTab === "business" ? 'bg-[#FEF9C3]' : 'bg-white'} hover:bg-[#FEF9C3] focus:outline-none`}>Business</button>
              </li>
              <li className="w-1/2">
                <button onClick={() => handleTabClick("investment")} type="button" role="tab" aria-controls="investment" aria-selected={activeTab === "investment"} className={`inline-block w-full p-4 ${activeTab === "investment" ? 'bg-[#FEF9C3]' : 'bg-white'} hover:bg-[#FEF9C3] focus:outline-none`}>Investment</button>
              </li>
              <li className="w-1/2">
                <button onClick={() => handleTabClick("job")} type="button" role="tab" aria-controls="job" aria-selected={activeTab === "job"} className={`inline-block w-full p-4 rounded-se-lg ${activeTab === "job" ? 'bg-[#FEF9C3]' : 'bg-white'} hover:bg-[#FEF9C3] focus:outline-none`}>Job</button>
              </li>
            </ul>
            <div id="fullWidthTabContent" className="border-t border-gray-300">
              {/* Business */}
              <div className={`p-4 bg-white rounded-lg md:p-8 ${activeTab === "business" ? '' : 'hidden'}`} id="business" role="tabpanel" aria-labelledby="business-tab">
                <div className="mb-4">
                  <label class="block mb-2 text-sm font-medium text-gray-900">Target Company Name</label>
                  <input type="text" id="company-name" placeholder="Lifegem" class="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50" />
                </div>
                <div className="mb-4">
                  <label class="block mb-2 text-sm font-medium text-gray-900">Target Industry</label>
                  <input type="text" id="industry" placeholder="Software" class="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50" />
                </div>
                <div className="">
                  <label class="block mb-2 text-sm font-medium text-gray-900">Target Monthly Net Profit</label>
                  <input type="text" id="net-worth" placeholder="$100,000" class="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50" />
                </div>
                {/* <div className="flex flex-col items-center">
                  <button onClick={""} type="submit" className="mt-4 rounded-full w-48 px-4 py-1 border text-lg text-gray-900 bg-gray-200 transition duration-300 hover:bg-gray-300"><strong>Save Changes</strong></button>
                </div> */}
              </div>
              <div className={`p-4 bg-white rounded-lg md:p-8 ${activeTab === "investment" ? '' : 'hidden'}`} id="investment" role="tabpanel" aria-labelledby="investment-tab">
                {/* Investment */}
                <div className="mb-4">
                  <label class="block mb-2 text-sm font-medium text-gray-900">Stocks/ETF</label>
                  <input type="text" id="stocks" placeholder="$4,000,000" class="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50" />
                </div>
                <div className="mb-4">
                  <label class="block mb-2 text-sm font-medium text-gray-900">Property/Land</label>
                  <input type="text" id="property" placeholder="$3,000,000" class="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50" />
                </div>
                <div className="mb-4">
                  <label class="block mb-2 text-sm font-medium text-gray-900">Crypto</label>
                  <input type="text" id="crypto" placeholder="$2,000,000" class="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50" />
                </div>
                <div className="">
                  <label class="block mb-2 text-sm font-medium text-gray-900">Cash</label>
                  <input type="text" id="cash" placeholder="$1,000,000" class="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50" />
                </div>
                {/* <div className="flex flex-col items-center">
                  <button onClick={""} type="submit" className="mt-4 rounded-full w-48 px-4 py-1 border text-lg text-gray-900 bg-gray-200 transition duration-300 hover:bg-gray-300"><strong>Save Changes</strong></button>
                </div> */}
              </div>
              <div className={`p-4 bg-white rounded-lg md:p-8 ${activeTab === "job" ? '' : 'hidden'}`} id="job" role="tabpanel" aria-labelledby="job-tab">
                {/* Job */}
                <div className="mb-4">
                  <label class="block mb-2 text-sm font-medium text-gray-900">Target Career Title</label>
                  <input type="text" id="career-title" placeholder="Principal Engineer" class="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50" />
                </div>
                <div className="mb-4">
                  <label class="block mb-2 text-sm font-medium text-gray-900">Target Company Name</label>
                  <input type="text" id="company" placeholder="Google" class="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50" />
                </div>
                <div className="">
                  <label class="block mb-2 text-sm font-medium text-gray-900">Target Monthly Net Income</label>
                  <input type="text" id="monthly-net-income" placeholder="$100,000" class="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50" />
                </div>
                {/* <div className="flex flex-col items-center">
                  <button onClick={""} type="submit" className="mt-4 rounded-full w-48 px-4 py-1 border text-lg text-gray-900 bg-gray-200 transition duration-300 hover:bg-gray-300"><strong>Save Changes</strong></button>
                </div> */}
              </div>
              <div className="flex flex-row mb-6 justify-center items-center">
                <label className="text-sm font-medium text-gray-900">Target Year:</label>
                <input type="number" id="target-year" placeholder="2027" className="ml-3 block w-1/5 p-1 text-gray-900 border border-gray-300 bg-gray-50 text-xs" />
              </div>
              <div className="flex flex-row justify-center items-center">
                <button onClick={""} type="submit" className="mb-6 rounded-full w-40 px-4 py-1 border text-lg text-gray-900 bg-gray-200 transition duration-300 hover:bg-gray-300"><strong>Back</strong></button>
                <button onClick={""} type="submit" className="ml-4 mb-6 rounded-full w-48 px-4 py-1 border text-lg text-gray-900 bg-[#FEF9C3] transition duration-300 hover:bg-[#FEF08A]"><strong>Save Changes</strong></button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-8xl font-semibold text-white hover:text-[#FEF9C3]">
              <span className="hover:underline">Your Life, Your Gem.</span>
            </h1>
            <h3 className="text-3xl font-semibold mt-2.5 mb-4 text-white hover:text-[#FEF9C3]">
              <span className="hover:underline">Visualize your success vision to get motivated.</span>
            </h3>
            <div className="flex p-8">
              <span className="inline-flex items-center px-4 text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md transition duration-300 hover:bg-gray-300">
                <svg className="w-6 h-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              </span>
              <input onChange={e => setName(e.target.value)} type="text" id="name" className="rounded-none bg-gray-50 border text-gray-900 focus:ring-0 focus:border-transparent block flex-1 min-w-0 w-full text-lg p-3 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100 focus:border-transparent focus:outline-none" placeholder="your name"
              />
              <button onClick={handleSubmit} type="submit" className="inline-flex items-center px-4 text-lg text-gray-900 bg-gray-200 border rounded-s-0 border-gray-300 border-s-0 rounded-e-md transition duration-300 hover:bg-gray-300"><strong>Next</strong></button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default App
