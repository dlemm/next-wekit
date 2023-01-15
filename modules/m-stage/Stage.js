import Image from 'next/future/image'
import styles from './Stage.module.scss'

const Stage = ({ headline, image }) => {
  return (
    <section className={styles.stage}>
      <div className={styles.inner}>
        <div className={styles.media}>
          <Image
            src={image}
            alt="Stage image"
            priority
            className={styles.image}
            sizes="(max-width: 768px) 100vw,
              (max-width: 1400px) 50vw,"
          />
        </div>
        <div className={styles.headline}>
          <h1 className={styles.title}>{headline}</h1>
        </div>
      </div>
    </section>
  )
}

export default Stage
