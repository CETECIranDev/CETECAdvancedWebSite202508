import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineShowChart } from "react-icons/md";
import { RiFullscreenFill } from "react-icons/ri";
import { useTranslation } from 'next-i18next';

export default function Workflow() {
  // changing language using new-products file
  const { t , i18n } = useTranslation('new-products')
    const steps = [
  {
    id: 1,
    title: `${t("workflow.connect")}`,
    description: `${t("workflow.connectParagraph")}`,
    icon: <FaCheckCircle className='absolute right-[40%] bottom-[40%] text-[40px] text-[#00D4FF]'/>,
  },
  {
    id: 2,
    title:  `${t("workflow.design")}`,
    description: `${t("workflow.designParagraph")}`,
    icon: <MdOutlineStar className='absolute right-[40%] bottom-[40%] text-[40px] text-[#00D4FF]'/>,
  },
  {
    id: 3,
    title: `${t("workflow.visualize")}`,
    description: `${t("workflow.visualizeParagraph")}`,
    icon: <MdOutlineShowChart className='absolute right-[40%] bottom-[40%] text-[40px] text-[#00D4FF]'/>,
  },
  {
    id: 4,
    title: `${t("workflow.deploy")}`,
    description: `${t("workflow.deployParagraph")}`,
    icon: <RiFullscreenFill className='absolute right-[40%] bottom-[40%] text-[40px] text-[#00D4FF]'/>,
  },
    ];

  return (
    <div className={`z-10 text-center lg:mx-40 mx-10 mt-36 font-inter ${i18n.language === "en" ? "font-inter" : "font-vazirMatn"}`} style={{direction: i18n.language === "en" ? "ltr" : "rtl"}}>
      <div className='flex flex-col justify-center items-center'>
        <h2 className='bg-[linear-gradient(135deg,var(--text-wh-gradient),var(--text-base-gradient))] bg-clip-text text-transparent font-bold text-[40px]'>{t("workflow.workflow")}</h2>
        <p className='mt-4 text-[var(--paragraph)] max-w-xl text-center leading-relaxed text-[18px]'>{t('workflow.workflowParagraph')}</p>
      </div>

      <div className='grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-evenly mt-7 gap-5'>
        {
            steps.map((step) => {
                return(
                    <div key={step.id} className='flex flex-col items-center gap-5 md:mb-5 mb-5 md:gap-5'>
                        <div className='flex items-center justify-center text-white font-bold text-[25px] rounded-full w-[55px] h-[55px] bg-[linear-gradient(135deg,#00b4ff,#7a5fff)]'> 
                            <div>{step.id}</div>
                        </div>
                        <div className='relative w-[200px] h-[150px] bg-[linear-gradient(135deg,var(--box-base-gradient),var(--box-wh-gradient))] border-[1px] border-gray-700 rounded-xl'>{step.icon}</div>

                        <div className='text-[var(--paragraph)] flex flex-col gap-2 md:gap-1 '>
                          <h3 className='font-semibold text-[20px]'>{step.title}</h3>
                          <p className='text-[15px]'>{step.description}</p>
                        </div>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}
