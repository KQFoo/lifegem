import { useEffect, useState } from 'react'
import background from './assets/cat2.jpg'
import Profile from './components/Profile'

function App() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("business");
  const [popUp, setPopUp] = useState(false);
  const [saving, setSaving] = useState(false);
  const [unsaving, setUnsaving] = useState(false);
  const [data, setData] = useState({});

  const showNotification = (message, type) => {
    const notification = document.createElement("div");
    notification.className = `fixed top-6 left-1/2 transform -translate-x-1/2 p-3 rounded-lg shadow-lg z-50 ${type === "success"
      ? "bg-green-500/80 border border-green-400/30 text-white"
      : "bg-red-500/80 border border-red-400/30 text-white"
      }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  const handleNext = async () => {
    if (name !== "") {
      localStorage.setItem("name", name);
      setSubmitted(true);
    }
  }

  const handleBack = async () => {
    setSubmitted(false);
    setActiveTab("business");
    setPopUp(false);
    localStorage.removeItem("name");
    localStorage.removeItem("data");
  }

  const handleSave = async () => {
    setSaving(false);
    setUnsaving(false);

    const companyNameElement = document.getElementById("companyName");
    const industryElement = document.getElementById("industry");
    const netProfitElement = document.getElementById("netProfit");
    const stocksElement = document.getElementById("stocks");
    const propertyElement = document.getElementById("property");
    const cryptoElement = document.getElementById("crypto");
    const cashElement = document.getElementById("cash");
    const careerTitleElement = document.getElementById("careerTitle");
    const companyElement = document.getElementById("company");
    const monthlyNetIncomeElement = document.getElementById("monthlyNetIncome");
    const targetYearElement = document.getElementById("targetYear");

    const dataToSave = {
      companyName: companyNameElement.value || "",
      industry: industryElement.value || "",
      netProfit: Number(netProfitElement.value) || 0,
      stocks: Number(stocksElement.value) || 0,
      property: Number(propertyElement.value) || 0,
      crypto: Number(cryptoElement.value) || 0,
      cash: Number(cashElement.value) || 0,
      careerTitle: careerTitleElement.value || "",
      company: companyElement.value || "",
      monthlyNetIncome: Number(monthlyNetIncomeElement.value) || 0,
      targetYear: Number(targetYearElement.value) || new Date().getFullYear(),
    };

    if (dataToSave.companyName === "" && dataToSave.industry === "" && dataToSave.netProfit === 0 && dataToSave.stocks === 0 && dataToSave.property === 0 && dataToSave.crypto === 0 && dataToSave.cash === 0 && dataToSave.careerTitle === "" && dataToSave.company === "" && dataToSave.monthlyNetIncome === 0) {
      localStorage.setItem("data", "{}");
      setUnsaving(true);
      showNotification("Save operation failed! Please fill out data.", "error");
    } else if (dataToSave.companyName !== "" || dataToSave.industry !== "" || dataToSave.netProfit !== 0 || dataToSave.stocks !== 0 || dataToSave.property !== 0 || dataToSave.crypto !== 0 || dataToSave.cash !== 0 || dataToSave.careerTitle !== "" || dataToSave.company !== "" || dataToSave.monthlyNetIncome !== 0) {
      localStorage.setItem("data", JSON.stringify(dataToSave));
      setSaving(true);
      setData(dataToSave);
      //showNotification("Data saved successfully!", "success");
    }
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  }

  useEffect(() => {
    const savedName = localStorage.getItem("name");

    if (savedName) {
      setName(savedName);
      setSubmitted(true);
    }
  }, []);

  return (
    <>
      {saving ? (
        <div className="bg-gray-300 flex h-screen items-center justify-center">
          <Profile data={data} />
        </div>
      ) : (
        <div className={`flex flex-col h-screen items-center justify-center relative ${popUp ? 'blur-none brightness-50' : ''}`} style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {submitted ? (
            // <h1>Target Net Worth</h1>
            <>
              <h1 className="mb-4 text-white font-light text-3xl hover:underline">Welcome, {name}!</h1>
              <div className="w-1/2 rounded-lg shadow-lg bg-white border-gray-300">
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
                      <label className="block mb-2 text-sm font-medium text-gray-900">Target Company Name</label>
                      <input type="text" id="companyName" placeholder="Lifegem" className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50" />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Target Industry</label>
                      <input type="text" id="industry" placeholder="Software" className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50" />
                    </div>
                    <div className="">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Target Monthly Net Profit (USD)</label>
                      <input type="number" min={0} id="netProfit" placeholder="100000" className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50" />
                    </div>
                    {/* <div className="flex flex-col items-center">
                  <button onClick={""} type="submit" className="mt-4 rounded-full w-48 px-4 py-1 border text-lg text-gray-900 bg-gray-200 transition duration-300 hover:bg-gray-300"><strong>Save Changes</strong></button>
                </div> */}
                  </div>
                  <div className={`p-4 bg-white rounded-lg md:p-8 ${activeTab === "investment" ? '' : 'hidden'}`} id="investment" role="tabpanel" aria-labelledby="investment-tab">
                    {/* Investment */}
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Stocks/ETF (USD)</label>
                      <input type="number" min={0} id="stocks" placeholder="4000000" className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50" />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Property/Land (USD)</label>
                      <input type="number" min={0} id="property" placeholder="3000000" className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50" />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Crypto (USD)</label>
                      <input type="number" min={0} id="crypto" placeholder="2000000" className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50" />
                    </div>
                    <div className="">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Cash (USD)</label>
                      <input type="number" min={0} id="cash" placeholder="1000000" className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50" />
                    </div>
                    {/* <div className="flex flex-col items-center">
                  <button onClick={""} type="submit" className="mt-4 rounded-full w-48 px-4 py-1 border text-lg text-gray-900 bg-gray-200 transition duration-300 hover:bg-gray-300"><strong>Save Changes</strong></button>
                </div> */}
                  </div>
                  <div className={`p-4 bg-white rounded-lg md:p-8 ${activeTab === "job" ? '' : 'hidden'}`} id="job" role="tabpanel" aria-labelledby="job-tab">
                    {/* Job */}
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Target Career Title</label>
                      <input type="text" id="careerTitle" placeholder="Principal Engineer" className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50" />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Target Company Name</label>
                      <input type="text" id="company" placeholder="Google" className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50" />
                    </div>
                    <div className="">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Target Monthly Net Income (USD)</label>
                      <input type="number" min={0} id="monthlyNetIncome" placeholder="100000" className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50" />
                    </div>
                    {/* <div className="flex flex-col items-center">
                  <button onClick={""} type="submit" className="mt-4 rounded-full w-48 px-4 py-1 border text-lg text-gray-900 bg-gray-200 transition duration-300 hover:bg-gray-300"><strong>Save Changes</strong></button>
                </div> */}
                  </div>
                  <div className="flex flex-row mb-6 justify-center items-center">
                    <label className="text-sm font-medium text-gray-900">Target Year:</label>
                    <input type="number" id="targetYear" min={new Date().getFullYear()} max={new Date().getFullYear() + 100} placeholder={new Date().getFullYear()} className="ml-3 block w-1/5 p-1 text-gray-900 border border-gray-300 bg-gray-50 text-xs" />
                  </div>
                  <div className="flex flex-row justify-center items-center">
                    <button onClick={() => setPopUp(true)} type="submit" className="mb-6 rounded-full w-40 px-4 py-1 border text-lg text-gray-900 bg-gray-200 transition duration-300 hover:bg-gray-300"><strong>Back</strong></button>
                    <button onClick={handleSave} type="submit" className="ml-4 mb-6 rounded-full w-48 px-4 py-1 border text-lg text-gray-900 bg-[#FEF9C3] transition duration-300 hover:bg-[#FEF08A]"><strong>Save Changes</strong></button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-6xl font-bold text-white hover:text-[#FEF9C3]">
                <span className="hover:underline">Create your success profile now</span>
              </h1>
              <h3 className="text-3xl font-semibold mt-2.5 mb-4 text-white hover:text-[#FEF9C3]">
                <span className="hover:underline">~ since <span className="bg-[#dc2626] italic">Your Life, Your Gem.</span></span>
              </h3>
              <div className="flex p-8">
                <span className="inline-flex items-center px-4 text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md transition duration-300 hover:bg-gray-300">
                  <svg className="w-6 h-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                </span>
                {/* <input onChange={e => setName(e.target.value)} type="text" id="name" className="rounded-none bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-lg p-3 transition duration-300 transform hover:scale-110 focus:border-black focus:outline" placeholder="your name" /> */}
                <input onChange={e => setName(e.target.value)} type="text" id="name" className="rounded-none bg-gray-50 border text-gray-900 focus:outline-none flex-1 min-w-0 w-full text-lg p-3" placeholder="your name" />
                <button onClick={handleNext} type="submit" className="inline-flex items-center px-4 text-lg text-gray-900 bg-gray-200 border rounded-s-0 border-gray-300 border-s-0 rounded-e-md transition duration-300 hover:bg-gray-300"><strong>Next</strong></button>
              </div>
            </>
          )}
        </div>
      )}
      {popUp ? (
        <div id="info-popup" tabindex="-1" className="flex items-center justify-center fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
          <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow md:p-8">
              <div className="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
                <h3 className="mb-3 text-2xl font-bold text-gray-900">Are you sure?</h3>
                <p className="font-medium text-gray-500">
                  You'll lose all the details.
                </p>
              </div>
              <div className="flex justify-center items-center pt-0 space-x-4">
                <button id="close-modal" type="button" className="py-2 px-4 w-full text-sm font-medium text-black bg-white rounded-lg border border-black hover:bg-gray-100" onClick={() => setPopUp(false)}>Cancel</button>
                <button id="confirm-button" type="button" className="py-2 px-4 w-full text-sm font-medium text-center text-white rounded-lg bg-[#dc2626] hover:bg-[#991b1b]" onClick={handleBack}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default App
