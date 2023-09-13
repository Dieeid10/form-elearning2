import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DataStudent, StepForm, ErrorToApi } from './context/dataStudent.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorToApi>
    <StepForm>
      <DataStudent>
        <App />
      </DataStudent>
    </StepForm>
  </ErrorToApi>
)
