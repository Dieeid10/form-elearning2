import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DataStudent, StepForm, ErrorToApi } from './context/dataStudent.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorToApi>
    <StepForm>
      <DataStudent>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DataStudent>
    </StepForm>
  </ErrorToApi>
)
