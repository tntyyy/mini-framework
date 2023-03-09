const app = document.getElementById("app");

const vdomExample = {
  tag: "div",
  props: {
    class: "block"
  },
  children: [
    {
      tag: "h1",
      props: {
        title: "Some text"
      },
      children: "some children text"
    },
    {
      tag: "span",
      props: {
        class: "subtitle"
      },
      children: "text in subtitle"
    }
  ]
};

const newVdomExample = {
  tag: "div",
  props: {
    class: "block"
  },
  children: [
    {
      tag: "h1",
      props: {
        title: "Some text"
      },
      children: "some children text :)"
    },
    {
      tag: "h3",
      props: {
        style: "color: red;"
      },
      children: "NEW TEXT"
    }
  ]
};

const node = h(vdomExample.tag, vdomExample.props, [
  h(
    vdomExample.children[0].tag, 
    vdomExample.children[0].props, 
    vdomExample.children[0].children
  ),
  h(
    vdomExample.children[1].tag, 
    vdomExample.children[1].props, 
    vdomExample.children[1].children
  ),
]);

const newNode = h(newVdomExample.tag, newVdomExample.props, [
  h(
    newVdomExample.children[0].tag, 
    newVdomExample.children[0].props, 
    newVdomExample.children[0].children
  ),
  h(
    newVdomExample.children[1].tag, 
    newVdomExample.children[1].props, 
    newVdomExample.children[1].children
  ),
]);


mount(node, app);

const replace = document.getElementById("replace");
const undo = document.getElementById("undo");

replace.addEventListener("click", () => {
  reconciliation(node, newNode);
});

undo.addEventListener("click", () => {
  reconciliation(newNode, node);
});