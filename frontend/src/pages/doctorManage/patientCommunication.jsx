import Button from "./button"

function PatientCommunication() {
    return ( 

        <>
        
        <div>
                <h2 className="text-2xl font-semibold mb-4 text-green-700">Patient Communication</h2>
                <div className="mb-4 bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2 text-green-600">Recent Messages</h3>
                  <p className="text-gray-600">No recent messages</p>
                </div>
                <div className="flex flex-col sm:flex-row">
                  <input
                    type="text"
                    placeholder="Type your message..."
                
                    className="flex-grow mb-2 sm:mb-0 sm:mr-2"
                  />
                  <Button >Send</Button>
                </div>
              </div>
        
        
         
        
        </>
     );
}

export default PatientCommunication;