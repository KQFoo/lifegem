import { useState, useRef } from "react"
import defaultAvatar from "../assets/avatar.jpg"
import * as htmlToImage from 'html-to-image';

// companyName => Text Founder @[companyName]
// industry    => Tag [industry]
// netProfit   => Section Make [netProfit] per month
// stocks      => Card [worth] stocks/ETF
// property    => Card [worth] property/land
// crypto      => Card [worth] crypto
// cash        => Card [worth] cash
// careerTitle => Text [careerTitle] @[company], Section [monthlyNetIncome] salary
// company
// monthlyNetIncome
// targetYear

// Design:
// name
// text, tag, text (if got job)
// section, section (igf got job)
// 4 cards
function Card({ title, worth }) {
    const formattedWorth = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(worth);

    return (
        <div className="bg-[#0077B5] rounded p-2 shadow-[#CFEDFB] hover:shadow-[#FFD700] hover:bg-[#FFD700] shadow-lg">
            <p className="text-white text-opacity-80 text-sm">{title}</p>
            <p className="text-white text-xl font-semibold">{formattedWorth}</p>
        </div>
    );
}

function Profile({ data }) {
    const name = localStorage.getItem("name");
    const [isMobileView, setIsMobileView] = useState(true);
    const [avatarUrl, setAvatarUrl] = useState(defaultAvatar);
    const profileRef = useRef(null);

    const handleAvatarClick = () => {
        document.getElementById('avatarUpload').click();
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatarUrl(imageUrl);
        }
    };

    const exportAsImage = async () => {
        try {
            const element = profileRef.current;

            // 1. Wait for all images to load
            const images = element.getElementsByTagName('img');
            await Promise.all([...images].map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            }));

            // 2. Temporarily adjust container for capture
            const originalStyle = element.style.minHeight;
            element.style.minHeight = 'auto';
            element.style.height = 'auto';

            const dataUrl = await htmlToImage.toPng(element, {
                quality: 1.0,
                pixelRatio: 2,
                backgroundColor: '#ffffff',
                style: {
                    // 3. Ensure proper dimensions during capture
                    width: '320px',
                    margin: '0',
                    padding: element.style.padding
                }
            });

            // 4. Restore original styling
            element.style.minHeight = originalStyle;

            // Download image
            const link = document.createElement('a');
            link.download = `${name}-profile.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Error exporting image:', error);
        }
    };

    return (
        <>
            {/* View Toggle */}
            {/* <div className="fixed top-4 right-4 z-10">
                <button
                    onClick={() => setIsMobileView(!isMobileView)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                >
                    {isMobileView ? 'Web View' : 'Mobile View'}
                </button>
            </div> */}

            {/* Add Export Button */}
            <div className="fixed bottom-1/2 right-1/3 transform translate-x-1/2 z-10">
                <button
                    onClick={exportAsImage}
                    className="border-2 bg-white shadow-lg border-[#0077B5] text-[#0077B5] hover:text-white px-5 py-2 rounded-full hover:bg-[#0077B5] transition-all duration-300 flex items-center gap-1"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span className="font-medium">Export image</span>
                </button>
            </div>

            <div
                ref={profileRef}
                className={`bg-white hover:shadow-xl flex flex-col justify-start p-3 md:p-6 ${isMobileView ? 'w-[320px] mx-auto' : ''
                    }`}
                style={{ minHeight: 'fit-content' }}>
                <div className="p-2.5 space-y-2">
                    <div className="flex flex-col items-start">
                        {/* Name and Avatar */}
                        <div className="flex items-center mb-2 gap-2">
                            <input
                                type="file"
                                id="avatarUpload"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                            <img
                                src={avatarUrl}
                                alt={`${name}'s avatar`}
                                className="w-12 h-12 rounded-full object-cover border-2 border-[#0077B5] shadow-lg shadow-[#CFEDFB] cursor-pointer hover:brightness-75"
                                onClick={handleAvatarClick}
                            />
                            <h1 className="text-2xl font-semibold text-black">{name}</h1>
                        </div>

                        {/* Title and Tags */}
                        {(data.companyName !== "" || data.careerTitle !== "") && (
                            <div className="flex flex-col">
                                <div className="flex flex-row justify-center items-center gap-2">
                                    {data.companyName !== "" && (
                                        <p className="text-black">
                                            Founder <span className="text-[#0077B5] font-medium hover:underline">@{data.companyName}</span>
                                        </p>
                                    )}
                                    {data.industry !== "" && (
                                        <span className="w-fit bg-[#CFEDFB] text-xs text-[#0077B5] px-1.5 py-0.5 rounded-full font-medium">
                                            {data.industry}
                                        </span>
                                    )}
                                </div>
                                {data.careerTitle !== "" && (
                                    <p className="text-black">
                                        {data.careerTitle} <span className="text-[#0077B5] font-medium hover:underline">@{data.company}</span>
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                    {(data.netProfit > 0 || data.monthlyNetIncome > 0) && (
                        <>
                            <hr className="w-full" />
                            <div className="space-y-1">
                                <h3 className="font-semibold text-md">Cashflow ({new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    notation: 'compact',
                                    maximumFractionDigits: 1
                                }).format((data.netProfit * 12) + (data.monthlyNetIncome * 12))}/year)</h3>
                                {data.netProfit > 0 && (
                                    <p className="text-black">Managing  {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        notation: 'compact',
                                        maximumFractionDigits: 1
                                    }).format(data.netProfit * 12)} business.</p>
                                )}
                                {data.monthlyNetIncome > 0 && (
                                    <p className="text-black">Taking {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        notation: 'compact',
                                        maximumFractionDigits: 1
                                    }).format(data.monthlyNetIncome * 12)} salary at {data.company}.</p>
                                )}
                            </div>
                        </>
                    )}
                    {(data.stocks > 0 || data.property > 0 || data.crypto > 0 || data.cash > 0) && (
                        <>
                            <hr className="w-full" />
                            <div className="">
                                <h3 className="font-semibold text-md mb-3">Net Worth <span className="underline">{data.targetYear}</span> ({new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    notation: 'compact',
                                    maximumFractionDigits: 1
                                }).format(data.stocks + data.property + data.crypto + data.cash)})</h3>
                                <div className="grid grid-rows-2 gap-2 md:grid-rows-4">
                                    {data.stocks > 0 && (
                                        <Card title="Stocks/ETF" worth={data.stocks} />
                                    )}
                                    {data.property > 0 && (
                                        <Card title="Property/Land" worth={data.property} />
                                    )}
                                    {data.crypto > 0 && (
                                        <Card title="Crypto" worth={data.crypto} />
                                    )}
                                    {data.cash > 0 && (
                                        <Card title="Cash" worth={data.cash} />
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                    <div className="pt-2">
                        <p className="text-xs text-gray-500 text-center">Created by <a href="#" target="_blank" rel="noopener noreferrer" className="underline">Lifegem</a></p>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Profile