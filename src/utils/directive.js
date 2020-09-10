const id = '_el-select-auto-width_';

export const autowidth = {
  bind () {
    if (document.getElementById(id)) return;
    const placeholder = document.createElement('div');
    placeholder.id = id;
    placeholder.style.cssText = `
      position: absolute;
      top: -9999px;
      padding: 0;
      overflow: hidden;
      border: 0;
      visibility: hidden;
    `;
    document.body.appendChild(placeholder);
  },
  componentUpdated (el, binding, vnode) {
    const placeholder = document.getElementById(id);
    placeholder.textContent = vnode.componentInstance.value;
    const width = placeholder.clientWidth;
    el.style.width = `${width + 60}px`;
  }
};

export const imgFluid = {
  bind (el, binding) {
    const img = new Image();
    img.src = binding.value;
    img.onload = () => {
      el.src = img.src;
      const { width, height } = el;
      if (width / height > el.dataset.aspectRatio) {
        el.style.height = '100%';
      } else {
        el.style.width = '100%';
      }
    };
  }
};
