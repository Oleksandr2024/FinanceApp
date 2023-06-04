import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={`${styles.not_found}`}>
      Sorry, but requested page is Not Found
    </div>
  );
};

export default NotFound;
