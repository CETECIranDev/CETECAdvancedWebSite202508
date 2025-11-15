'use client'
import React from 'react'
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineShowChart } from "react-icons/md";
import { IoExtensionPuzzle } from "react-icons/io5";
import { IoGift } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

export default function Discovering() {
  // changing language using new-products file
  const { t , i18n } = useTranslation('new-products')
    const tools = [
        {
            id: 1,
            title: `${t("discovering.visualEditor")}`,
            paragraph: `${t("discovering.visualEditorParagraph")}`,
            icon: <MdOutlineStar className='w-[18%] h-[90%] p-3 rounded-md bg-[linear-gradient(135deg,#00b4ff,#7a5fff)] text-white'/>
        },
        {
            id: 2,
            title: `${t("discovering.realTimeVisualization")}`,
            paragraph: `${t("discovering.realTimeVisualizationParagraph")}`,
            icon: <MdOutlineShowChart className='w-[18%] h-[90%] p-3 rounded-md bg-[linear-gradient(135deg,#00b4ff,#7a5fff)] text-white'/>
        },
        {
            id: 3,
            title: `${t("discovering.componentLibraray")}`,
            paragraph: `${t("discovering.componentLibrarayParagraph")}`,
            icon: <IoGift className='w-[18%] h-[90%] p-3 rounded-md bg-[linear-gradient(135deg,#00b4ff,#7a5fff)] text-white'/>
        },
        {
            id: 4,
            title: `${t("discovering.pluginSystem")}`,
            paragraph: `${t("discovering.pluginSystemParagraph")}`,
            icon: <IoExtensionPuzzle className='w-[18%] h-[90%] p-3 rounded-md bg-[linear-gradient(135deg,#00b4ff,#7a5fff)] text-white'/>
        },
    ]

  return (
    <div className={`z-10 text-center lg:mx-40 mx-10 font-inter ${i18n.language === "en" ? "font-inter" : "font-vazirMatn"}`} style={{direction: i18n.language === "en" ? "ltr" : "rtl"}}>
      <div className='flex flex-col justify-center items-center'>
        <h2 className=' bg-[linear-gradient(135deg,var(--text-wh-gradient),var(--text-base-gradient))] bg-clip-text text-transparent font-bold text-[40px]'>{t("discovering.stopCoding")}</h2>
        <p className='mt-4 text-[var(--paragraph)] max-w-xl text-center leading-relaxed text-[18px]'>{t("discovering.stopCodingParagraph")}</p>
      </div>

      <div className='grid lg:grid-cols-3 gap-8 mt-7 md:grid-cols-2 grid-cols-1'>
        {tools.map((item) => {
            return(
                <div key={item.id} className={`bg-[linear-gradient(135deg,var(--box-base-gradient),var(--box-wh-gradient))] )] py-5 px-10 flex flex-col gap-3 ${i18n.language === "en" ? "text-left" : "text-right"} rounded-lg h-[300px] justify-center border-[1px] border-gray-700`}>
                    <span>{item.icon}</span>
                    <p className='text-white font-medium text-[20px]'>{item.title}</p>
                    <p className='text-gray-300 text-[16px]'>{item.paragraph}</p>
                </div>
            )
        })}
      </div>
    </div>
  )
}
