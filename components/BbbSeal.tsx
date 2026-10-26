import React from 'react';

/**
 * BBB Accredited Business seal, used in the hero and the footer.
 *
 * This is BBB's own 160x82 "Accredited Business" style. The 200x42 style printed
 * "BBB Rating: A+ as of <today's date>", which read like an award they had just won,
 * and BBB doesn't allow the seal image itself to be edited, so we use a dateless style.
 * Link and image URL are verbatim from BBB's seal frame for this business (bid + chk).
 * The white card keeps BBB's dark-blue "Click for Profile" text legible on dark backgrounds.
 */
const BBB_PROFILE_URL =
  'https://www.bbb.org/us/ga/douglasville/profile/roofing-contractors/mckinley-roofing-restoration-0443-28198426#sealclick';
const BBB_SEAL_SRC =
  'https://seal-atlanta.bbb.org/gen-seals/img.png?bid=28198426&w=160&h=82&color=blue&v=2&chk=6D31EA7289';

interface BbbSealProps {
  /** Sizing/positioning for the card; the seal scales to the card's width. */
  className?: string;
}

const BbbSeal: React.FC<BbbSealProps> = ({ className = '' }) => (
  <a
    href={BBB_PROFILE_URL}
    target="_blank"
    rel="nofollow noopener"
    className={`block bg-white rounded-xl p-2 shadow-lg ${className}`}
  >
    <img
      src={BBB_SEAL_SRC}
      alt="BBB Accredited Business seal for McKinley Roofing"
      width={160}
      height={82}
      loading="lazy"
      className="block w-full h-auto"
    />
  </a>
);

export default BbbSeal;
