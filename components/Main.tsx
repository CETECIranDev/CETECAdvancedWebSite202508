
import React from 'react'
import { IoMdPlay } from "react-icons/io";
import { AiFillCaretRight } from "react-icons/ai";
import { useTranslation } from 'next-i18next';
import brain from 'public/images/brain-computer.jpg'

export default function Main() {
  // changing language using new-products file
  const { t , i18n } = useTranslation('new-products')
  return (
    <div style={{direction: i18n.language === "en" ? "ltr" : "rtl"}} >
        <div className={`relative flex gap-4 min-h-screen text-white overflow-hidden font-inter  ${i18n.language === "en" ? "font-inter" : "font-vazirMatn"}`}>
          {/* background image */}
          <div className="absolute inset-0 z-0">
          <img 
            src='/images/brain-computer.jpg'
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70 z-50"></div>
          </div>
          
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,255,0.08)_0%,rgba(0,0,0,0)_40%)] pointer-events-none">
          </div>
          <div className='relative z-40 flex lg:flex-row flex-col items-center justify-center min-h-screen  text-center w-[100%] gap-16 lg:mx-40 mx-10 lg:mt-10 mt-32'>
            {/* The Main Title */}
            <div className='lg:w-[50%] w-[100%]'>
              <h1 className={`text-5xl text-cyan-400 ${i18n.language === "en" ? "text-left" : "text-right"} text-[calc(1rem*3.5)] leading-[1.2] mb-8 bg-[linear-gradient(135deg,#fff,#00d4ff)] bg-clip-text text-transparent font-extrabold`}>{t('main.brainComputer')}</h1>
              <p className={`mt-4 text-[#d1d5db] max-w-xl leading-relaxed text-[20px] ${i18n.language === "en" ? "text-left" : "text-right"}`}>
                {t("main.brainComputerParagraph")}
              </p>
              <div className="mt-6 flex gap-4">
                <button
                  className="px-5 py-2 rounded-lg font-medium bg-[linear-gradient(135deg,#00b4ff,#7a5fff)] hover:opacity-90 transition hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(0,212,255,0.3)]">
                  {t("main.requestDemo")}
                </button>
                <button className="text-[#fff] flex items-center gap-2 px-8 py-2 rounded-lg font-medium border-[2px] border-gray-600 hover:border-blue-500 hover:text-blue-500 hover:transition duration-100 hover:translate-y-[-2px]">
                 <IoMdPlay /> {t("main.intro")}
                </button>
              </div>
            </div>
            {/* Monitor */}
            <div className='lg:w-[50%] w-[100%]'>
              <div className='w-[100%]'>
                <div className='bg-[#2e2e51] rounded-3xl p-5'>
                  <div className='flex gap-2 mb-2'>
                    <div className='h-3 w-3 bg-[#FF5F57] rounded-full'></div>
                    <div className='h-3 w-3 bg-[#FFBD2E] rounded-full'></div>
                    <div className='h-3 w-3 bg-[#28CA42] rounded-full'></div>
                  </div>
                  <div className={`bg-[#161639] rounded-xl flex items-center py-6 px-6 justify-center h-[300px]  ${i18n.language === "fa" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className='bg-[linear-gradient(135deg,#00b4ff,#7a5fff)] hover:opacity-90 transition hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(0,212,255,0.3)] rounded-md p-2 animate-pulseGlow w-[25%]'>EEG input</div>
                    <div className={`flex items-center justify-center ${i18n.language === "fa" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className='w-[30px] h-[3px] bg-blue-500 flex'></div>
                      <AiFillCaretRight className='ml-[-4px] text-blue-500'/>
                    </div>
                    <div className='bg-[linear-gradient(135deg,#00b4ff,#7a5fff)] hover:opacity-90 transition hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(0,212,255,0.3)] rounded-md p-2 animate-pulseGlow w-[20%]'>Filter</div>
                    <div className={`flex items-center justify-center ${i18n.language === "fa" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className='w-[30px] h-[3px] bg-blue-500 flex'></div>
                      <AiFillCaretRight className='ml-[-4px] text-blue-500'/>
                    </div>
                    <div className='bg-[linear-gradient(135deg,#00b4ff,#7a5fff)] hover:opacity-90 transition hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(0,212,255,0.3)] rounded-md p-2 animate-pulseGlow w-[20%]'>CSP</div>
                    <div className={`flex items-center justify-center ${i18n.language === "fa" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className='w-[30px] h-[3px] bg-blue-500 flex'></div>
                      <AiFillCaretRight className='ml-[-4px] text-blue-500'/>
                    </div>
                    <div className='bg-[linear-gradient(135deg,#00b4ff,#7a5fff)] hover:opacity-90 transition hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(0,212,255,0.3)] rounded-md p-2 animate-pulseGlow w-[20%]'>Classifier</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
