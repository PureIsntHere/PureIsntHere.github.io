// Flatten & tree-build helpers (same as in your page)
function buildTree(arr) {
  const map = {};
  arr.forEach(item => {
    const parts = item.path.split('/');
    let cur = map;
    parts.forEach((p, i) => {
      if (!cur[p]) cur[p] = { name: p, children: {}, path: null };
      if (i === parts.length - 1) cur[p].path = item.path;
      cur = cur[p].children;
    });
  });
  const toArr = obj =>
    Object.values(obj).map(n => ({
      name: n.name,
      path: n.path,
      children: toArr(n.children),
    }));
  return toArr(map);
}

onmessage = ({ data }) => {
  const { index, raw } = data;
  const tokens = raw.split(/\s+/).filter(t => t);
  const exts = tokens.filter(t => t.startsWith('*.')).map(t => t.slice(1));
  const kws = tokens.filter(t => !t.startsWith('*.'));

  // Do the heavy filter
  const matches = index.filter(it => {
    const name = it.name.toLowerCase();
    if (!kws.every(k => name.includes(k))) return false;
    if (exts.length && !exts.some(e => name.endsWith(e))) return false;
    return true;
  });

  // Build nested tree structure
  const treeData = buildTree(matches);

  // Send it back
  postMessage(treeData);
};
