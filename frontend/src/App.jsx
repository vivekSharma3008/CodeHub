import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Navbar from './pages/Navbar/Navbar'
import ProjectDetails from './pages/ProjectDetails/ProjectDetails'
import IssueDetails from './pages/IssueDetails/IssueDetails'
import Subscription from './pages/Subscription/Subscription'
import Auth from './pages/Auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from './Redux/Auth/Action'
import UpgradeSuccess from './pages/Subscription/UpgradeSuccess'
import AcceptInvitation from './pages/Project/AcceptInvitation'
import Loader from './pages/Loader/Loader'
import UpdateProject from './pages/Project/UpdateProject'
import { getUserSubscription } from './Redux/Subscription/Action'

function App() {

  const dispatch = useDispatch();
  const {auth} = useSelector(store=>store);

  useEffect(() => {
    if(auth.jwt || localStorage.getItem("jwt")){
      dispatch(getUser(auth.jwt || localStorage.getItem("jwt")));
      dispatch(getUserSubscription(auth.jwt || localStorage.getItem("jwt")));
    } 
  },[auth.jwt])

  return (
    <>
      {
        auth.loading?<Loader/>:auth.user ? (
          <div>
            <Navbar/>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/project/:id" element={<ProjectDetails/>} />
              <Route path="/project/update/:id" element={<UpdateProject />} />
              <Route path="/project/:projectId/issue/:issueId" element={<IssueDetails/>} />
              <Route path="/upgrade_plan" element={<Subscription/>} />
              <Route path="/upgrade_plan/success" element={<UpgradeSuccess/>} />
              <Route path="/accept_invitation" element={<AcceptInvitation/>} />
            </Routes>
          </div>
        ): (<Auth/>
      )
      }
    </>
  );
}

export default App
