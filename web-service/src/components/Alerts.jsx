import {Alert} from "react-bootstrap";

function Alerts({alerts, dismissAlert}) {
    return (
        <>
            {alerts.map((alert, index) => (
                <Alert
                    key={index}
                    variant={alert.variant}
                    onClose={() => dismissAlert(index)}
                    dismissible
                >
                    {alert.message}
                </Alert>
            ))}
        </>
    );
}

export default Alerts;