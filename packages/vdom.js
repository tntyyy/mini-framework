// create vnode
function h(tag, props, children) {
  return {
    tag,
    props,
    children
  }
}

// mount virtual node to the dom
function mount(vnode, root) {
  const element = document.createElement(vnode.tag);

  for (const key in vnode.props) {
    element.setAttribute(key, vnode.props[key]);
  }

  if (typeof vnode.children === "string") {
    element.textContent = vnode.children;
  } else {
    vnode.children.forEach((childElement) => {
      mount(childElement, element);
    });
  }

  root.appendChild(element);

  vnode.$element = element;
}

// unmount vnode from dom 
function unmount(vnode) {
  vnode.$element.parentNode.removeChild(vnode.$element);
}

// reconciliation
function reconciliation(oldNode, newNode) {
  if (oldNode.tag !== newNode.tag) {
    mount(newNode, oldNode.$element.parentNode);
    unmount(oldNode);
    return;
  }

  newNode.$element = oldNode.$element;

  if (typeof newNode.children === "string") {
    newNode.$element.textContent = newNode.children;
  } else {
    while (newNode.$element.attributes.length > 0) {
      newNode.$element.removeAttribute(newNode.$element.attributes[0].name);
    }

    for (const key in newNode.props) {
      newNode.$element.setAttribute(key, newNode.props[key]);
    }

    if (typeof oldNode.children === "string") {
      newNode.$element.textContent = null;
      newNode.children.forEach((child) => {
        mount(child, newNode.$element);
      });
    } else {
      const commonLength = Math.min(oldNode.children.length, newNode.children.length);

      for (let i = 0; i < commonLength; i++) {
        reconciliation(oldNode.children[i], newNode.children[i]);
      }

      if (oldNode.children.length > newNode.children.length) {
        oldNode.children.slice(newNode.children.length).forEach(element => {
          unmount(element);
        });
      }

      if (newNode.children.length > oldNode.children.length) {
        newNode.children.slice(oldNode.children.length).forEach(element => {
          mount(element);
        });
      }
    }
  }
}