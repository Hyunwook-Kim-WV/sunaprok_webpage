document.addEventListener('DOMContentLoaded', () => {
  const faqs = document.querySelectorAll('.faq details');
  faqs.forEach((d) => {
    d.addEventListener('toggle', () => {
      if (d.open) {
        faqs.forEach((other) => {
          if (other !== d) other.open = false;
        });
      }
    });
  });
});
