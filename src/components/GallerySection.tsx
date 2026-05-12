import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './GallerySection.css';

const images = [
  {
    url: "/one.JPG",
    title: "The beginning",
    offset: "0%",
    width: "40%"
  },
  {
    url: "/two.JPG",
    title: "Quiet moments",
    offset: "15%",
    width: "35%"
  },
  {
    url: "/five.JPEG",
    title: "Laughter",
    offset: "-10%",
    width: "45%"
  },
  {
    url: "/four.JPG",
    title: "Everyday magic",
    offset: "5%",
    width: "30%"
  }
];

export default function GallerySection() {
  return (
    <section className="gallery">
      <div className="gallery__header">
        <motion.h2
          className="gallery__title serif"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Her Story in Frames
        </motion.h2>
      </div>

      <div className="gallery__grid">
        {images.map((img, i) => (
          <GalleryItem key={i} img={img} index={i} />
        ))}
      </div>
    </section>
  );
}

function GalleryItem({ img, index }: { img: any; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? 100 : -100]);

  return (
    <motion.div
      ref={ref}
      className="gallery__item-container"
      style={{
        width: img.width,
        marginLeft: index % 2 === 0 ? "5%" : "auto",
        marginRight: index % 2 !== 0 ? "5%" : "auto",
        y
      }}
    >
      <motion.div
        className="gallery__item"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="gallery__img-wrapper">
          <img src={img.url} alt={img.title} />
        </div>
        <div className="gallery__info">
          <span className="gallery__caption serif">{img.title}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
