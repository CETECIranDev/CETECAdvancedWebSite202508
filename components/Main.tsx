
import React from 'react'
import { IoMdPlay } from "react-icons/io";
import { AiFillCaretRight } from "react-icons/ai";
import { useTranslation } from 'next-i18next';

export default function Main() {
  // changing language using new-products file
  const { t , i18n } = useTranslation('new-products')
  return (
    <div style={{direction: i18n.language === "en" ? "ltr" : "rtl"}} >
        <div className={`relative flex gap-4 min-h-screen text-white overflow-hidden font-inter  ${i18n.language === "en" ? "font-inter" : "font-vazirMatn"}`}>
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_0.5px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_0.5px,transparent_1px)] bg-[size:40px_40px] pointer-events-none">
          </div>
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,255,0.08)_0%,rgba(0,0,0,0)_40%)] pointer-events-none">
          </div>
          <div className='relative z-10 flex lg:flex-row flex-col items-center justify-center min-h-screen  text-center w-[100%] gap-16 lg:mx-40 mx-10 lg:mt-10 mt-32'>
            {/* The Main Title */}
            <div className='lg:w-[50%] w-[100%]'>
              <h1 className={`text-5xl text-cyan-400 ${i18n.language === "en" ? "text-left" : "text-right"} text-[calc(1rem*3.5)] leading-[1.2] mb-8 bg-[linear-gradient(135deg,var(--text-wh-gradient),var(--text-base-gradient))] bg-clip-text text-transparent font-extrabold`}>{t('main.brainComputer')}</h1>
              <p className={`mt-4 text-[var(--paragraph)] max-w-xl leading-relaxed text-[20px] ${i18n.language === "en" ? "text-left" : "text-right"}`}>
                {t("main.brainComputerParagraph")}
              </p>
              <div className="mt-6 flex gap-4">
                <button
                  className="px-5 py-2 rounded-lg font-medium bg-[linear-gradient(135deg,#00b4ff,#7a5fff)] hover:opacity-90 transition hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(0,212,255,0.3)]">
                  {t("main.requestDemo")}
                </button>
                <button className="text-[var(--text)] flex items-center gap-2 px-8 py-2 rounded-lg font-medium border-[2px] border-gray-600 hover:border-blue-500 hover:text-blue-500 hover:transition duration-100 hover:translate-y-[-2px]">
                 <IoMdPlay /> {t("main.intro")}
                </button>
              </div>
            </div>
            {/* Monitor */}
            <div className='lg:w-[50%] w-[100%]'>
              <div className='w-[100%]'>
                <div className='bg-[var(--monitor)] rounded-3xl p-5'>
                  <div className='flex gap-2 mb-2'>
                    <div className='h-3 w-3 bg-[#FF5F57] rounded-full'></div>
                    <div className='h-3 w-3 bg-[#FFBD2E] rounded-full'></div>
                    <div className='h-3 w-3 bg-[#28CA42] rounded-full'></div>
                  </div>
                  <div className={`bg-[var(--monitor-page)] rounded-xl flex items-center py-6 px-6 justify-center h-[300px]  ${i18n.language === "fa" ? "flex-row-reverse" : "flex-row"}`}>
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
