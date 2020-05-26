import React, { useState } from 'react';
import classnames from 'classnames';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function VideoModal({ open, close}) {
  return (
    <div className={classnames(styles.modalWindow, { 'hide-modal': !open })}>
      <div className={styles.modalBackground} />
      <a href='#video' className={styles.close} onClick={close}>close</a>
      <div className={styles.modalContent}>
        <div className={styles.youtubeWrapper}>
          <iframe
            className={styles.youtubeIFrame}
            frameBorder="0"
            width="560"
            height="310" scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://www.youtube.com/embed/z3hUF5egjT4"
            frameBorder="0"
            allowFullScreen
            align="middle"
          />
        </div>
      </div>
    </div>
  );
}

export function Video() {
  const [open, setOpen] = useState(false);

  const toggleModal = (event) => {
    event.preventDefault();
    setOpen(!open);
  }

  return (
    <>
      <VideoModal open={open} close={toggleModal} />
      <section id="video" className={styles.videoSection}>
        <div className="text--center">
          <h2 className={styles.subtitle}>Graphback in 10 minutes</h2>
          <div className={styles.videoComponent}>
            <a href="#" className={styles.play} onClick={toggleModal}>
              {/* Play */}
              <img src={useBaseUrl('img/play.png')} alt=""/>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
