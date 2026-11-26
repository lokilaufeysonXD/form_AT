import styles from "@/styles/Skeleton.module.css";

function SkeletonLayout() {
    return (
        <div className={styles.skeletonContainer}>
            <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonText}`}></div>
            <div className={styles.skeletonRow}>
                <div className={`${styles.skeleton} ${styles.skeletonCard}`}>    </div>
                <div className={`${styles.skeleton} ${styles.skeletonCard}`}>    </div>
                <div className={`${styles.skeleton} ${styles.skeletonCard}`}>    </div>
            </div>
        </div>


    );
}

export default SkeletonLayout;