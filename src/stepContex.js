import React,{useState} from 'react'
import App from './App'


export const multiStepContex = React.createContext()
    const StepContex = () => {
        const [currentStep,setStep] = useState(1)
        const [formData,setFormData] = useState([])
        const [finalData,setFinalData] = useState([])
        return (
            <div>
                <multiStepContex.Provider value={{currentStep,setStep,formData,setFormData,finalData,setFinalData }}>
                    <App />
                </multiStepContex.Provider>

            </div>
        )
    }

export default StepContex