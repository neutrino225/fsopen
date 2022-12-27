/** @format */

const Notification = ({ message, state }) => {
	if (message === null) {
		return null;
	} else if (state === 1) {
		return <div className="success">{message}</div>;
	} else if (state === 0) {
		return <div className="error">{message}</div>;
	}
};

export default Notification;
