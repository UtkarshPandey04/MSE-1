function FeedbackMessage({ message, type }) {
  if (!message) {
    return null;
  }

  return <p className={`feedback ${type}`}>{message}</p>;
}

export default FeedbackMessage;
