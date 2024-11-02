import React from "react";
import styles from "./main-footer.module.scss";
import { Icons } from "./icons";

const year = new Date(Date.now()).getFullYear();
const COPYRIGHT_NOTICE = `Copyright ${year} ©Datatattat.`;
const COPYRIGHT_MESSAGE =
	"Datatattat is not responsible for the content of external sites.";

const Copyright = () => {
	return (
		<p className={styles.copyright}>
			<strong>{COPYRIGHT_NOTICE} </strong>
			{COPYRIGHT_MESSAGE}
		</p>
	);
};

export const MainFooter = () => {
	return (
		<footer className={styles.root}>
			<div className={styles.divider} />
			<div className={styles.container}>
				<Icons />
			</div>
			<div className={styles.divider} />
			<div className={styles.container}>
				<Copyright />
			</div>
		</footer>
	);
};
