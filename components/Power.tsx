import React from 'react'
import { BiNews } from "react-icons/bi";
import { FaHandPaper } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaEarthAfrica } from "react-icons/fa6";
import { useTranslation } from 'react-i18next'; 

export default function Power() {
    // changing language using new-products file
    const { t , i18n } = useTranslation('new-products')
    const Applications = [
    {
        id:1,
        title: `${t("power.communication")}`,
        description: `${t("power.communicationParagraph")}`,
        icon: <BiNews className='text-[70px] absolute right-[40%] bottom-[35%]'/>, 
    },
    {
        id:2,
        title: `${t("power.neuroprosthetics")}`,
        description:
        `${t("power.neuroprostheticsParagraph")}`,
        icon: <FaHandPaper className='text-[70px] absolute right-[40%] bottom-[35%]'/>,
    },
    {
        id:3,
        title: `${t("power.control")}`,
        description: `${t("power.controlParagraph")}`,
        icon: <FaCheckCircle className='text-[70px] absolute right-[40%] bottom-[35%]'/>,
    },
    {
        id:4,
        title: `${t("power.training")}`,
        description: `${t("power.trainingParagraph")}`,
        icon: <FaEarthAfrica className='text-[70px] absolute right-[40%] bottom-[35%]'/>,
    },
    {
        id:5,
        title: `${t("power.beyondBCI")}`,
        description: `${t("power.beyondBCIParagraph")}`,
        icon: <FaCheckCircle className='text-[70px] absolute right-[40%] bottom-[35%]'/>,
    },
    ];

  return (
    <div className={`z-10 text-cente lg:mx-40 mx-10 mt-36 font-inter ${i18n.language === "en" ? "font-inter" : "font-vazirMatn"}`} style={{direction: i18n.language === "en" ? "ltr" : "rtl"}}>
      <div className='flex flex-col justify-center items-center'>
        <h2 className=' bg-[linear-gradient(135deg,#00b4ff,#7a5fff)] bg-clip-text text-transparent font-bold text-[40px]'>{t("power.power")}</h2>
        <p className='mt-4 text-[var(--paragraph)] max-w-xl text-center leading-relaxed text-[18px]'>{t("power.powerParagraph")}</p>
      </div>

      <div className='text-white grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-7'>
        {Applications.map((item , index) => {
            return(
                <div key={index}>
                    <div className=' bg-[linear-gradient(135deg,var(--box-base-gradient),var(--box-wh-gradient))]  rounded-t-xl h-[200px] relative'>
                        {item.icon}
                    </div>
                    <div className={` bg-[#1A1A2E] rounded-b-xl h-[120px] px-5 py-2 flex flex-col ${i18n.language === "en" ? "text-left" : "text-right"} justify-center gap-2`}>
                        <h2 className='text-[16px] font-bold'>{item.title}</h2>
                        <p className='text-[14px] text-[#ffffffb3]'>{item.description}</p>
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  )
}
