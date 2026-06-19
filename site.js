const siteNavItems = [
  { href: "index.html", label: "home" },
  { href: "work.html", label: "work" },
  { href: "publications.html", label: "publications" },
  { href: "teaching.html", label: "teaching" },
];

const socialLinks = [
  {
    href: "https://x.com/@estefanoMunoz23",
    title: "Link to X Profile",
    icon: "./images/twitter_black.svg",
    alt: "X",
  },
  {
    href: "https://scholar.google.com/citations?&user=930f_CMAAAAJ",
    title: "Link to Google Scholar Profile",
    icon: "./images/googleScholar.svg",
    alt: "Google Scholar",
  },
  {
    href: "https://www.researchgate.net/profile/Estefano-Munoz-Moya",
    title: "Link to ResearchGate Profile",
    icon: "./images/researchgate.svg",
    alt: "ResearchGate",
  },
  {
    href: "https://github.com/estefano23",
    title: "Link to GitHub Profile",
    icon: "./images/github.svg",
    alt: "GitHub",
  },
  {
    href: "https://orcid.org/0000-0001-5222-4071",
    title: "Link to ORCID Profile",
    icon: "./images/orcid.svg",
    alt: "ORCID",
  },
  {
    href: "https://www.linkedin.com/in/estefano-munoz-moya",
    title: "Link to LinkedIn Profile",
    icon: "./images/linkedin.svg",
    alt: "LinkedIn",
  },
  {
    href: "https://loop.frontiersin.org/people/241865/overview",
    title: "Link to Loop Profile",
    icon: "./images/loop.svg",
    alt: "Loop",
  },
];

const linkedinPosts = [
  // Paste LinkedIn post URLs here. Supported forms:
  // https://www.linkedin.com/posts/...-activity-1234567890123456789-...
  // https://www.linkedin.com/feed/update/urn:li:activity:1234567890123456789/
  // https://www.linkedin.com/embed/feed/update/urn:li:activity:1234567890123456789
];

const renderSiteNav = () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll("[data-site-nav]").forEach((nav) => {
    const list = document.createElement("ul");
    list.className = "nav__items";

    siteNavItems.forEach((item) => {
      const li = document.createElement("li");
      li.className = "nav__item";

      const link = document.createElement("a");
      link.href = item.href;
      link.className = "nav__link";
      link.textContent = item.label;

      if (item.href === currentPage) {
        link.setAttribute("aria-current", "page");
      }

      li.appendChild(link);
      list.appendChild(li);
    });

    nav.replaceChildren(list);
  });
};

const renderSocialLinks = () => {
  document.querySelectorAll("[data-social-links]").forEach((container) => {
    const isList = container.tagName.toLowerCase() === "ul";
    const imageClass = container.dataset.socialLinks === "profile"
      ? "initial__social-image"
      : "footer__social-image";

    const nodes = socialLinks.map((item) => {
      const link = document.createElement("a");
      link.href = item.href;
      link.title = item.title;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      const img = document.createElement("img");
      img.src = item.icon;
      img.className = imageClass;
      img.alt = item.alt;

      link.appendChild(img);

      if (!isList) {
        return link;
      }

      const li = document.createElement("li");
      li.className = "footer__social-link-item";
      li.appendChild(link);
      return li;
    });

    container.replaceChildren(...nodes);
  });
};

const getLinkedInEmbedUrl = (postUrl) => {
  if (!postUrl) return "";

  const decodedUrl = decodeURIComponent(postUrl.trim());
  const embedded = decodedUrl.match(/linkedin\.com\/embed\/feed\/update\/(urn:li:[^/?#]+)/i);
  if (embedded) {
    return `https://www.linkedin.com/embed/feed/update/${embedded[1]}`;
  }

  const updateUrn = decodedUrl.match(/urn:li:(?:activity|share|ugcPost):\d+/i);
  if (updateUrn) {
    return `https://www.linkedin.com/embed/feed/update/${updateUrn[0]}`;
  }

  const activityId = decodedUrl.match(/activity-(\d{10,})/i);
  if (activityId) {
    return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityId[1]}`;
  }

  return "";
};

const renderLinkedInPosts = () => {
  document.querySelectorAll("[data-linkedin-posts]").forEach((container) => {
    const embeds = linkedinPosts.map(getLinkedInEmbedUrl).filter(Boolean);

    if (!embeds.length) {
      container.hidden = true;
      return;
    }

    const frames = embeds.map((src, index) => {
      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.title = `LinkedIn post ${index + 1}`;
      iframe.width = "504";
      iframe.height = "520";
      iframe.frameBorder = "0";
      iframe.allowFullscreen = true;
      return iframe;
    });

    container.replaceChildren(...frames);
    container.hidden = false;
  });
};

const secureBlankTargets = () => {
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    const currentRel = link.getAttribute("rel") || "";
    const relParts = new Set(currentRel.split(/\s+/).filter(Boolean));
    relParts.add("noopener");
    relParts.add("noreferrer");
    link.setAttribute("rel", Array.from(relParts).join(" "));
  });
};

document.addEventListener("DOMContentLoaded", () => {
  renderSiteNav();
  renderSocialLinks();
  renderLinkedInPosts();
  secureBlankTargets();
});
