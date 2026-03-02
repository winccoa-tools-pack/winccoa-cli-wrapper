import Conf from 'conf';

const store = new Conf({
  projectName: 'winccoa-cli',
  schema: {
    activeVersion: {
      type: 'string',
      default: '',
    },
    versions: {
      type: 'object',
      default: {},
    },
  },
});

export function getConfig() {
  return {
    activeVersion: store.get('activeVersion') || null,
    versions: store.get('versions') ?? {},
  };
}

export function setActiveVersion(version) {
  store.set('activeVersion', version);
}

export function addVersion(version, binPath) {
  const versions = store.get('versions') ?? {};
  versions[version] = { binPath, addedAt: new Date().toISOString() };
  store.set('versions', versions);
}

export function removeVersion(version) {
  const versions = store.get('versions') ?? {};
  delete versions[version];
  store.set('versions', versions);

  if (store.get('activeVersion') === version) {
    store.set('activeVersion', '');
  }
}

export function getConfigPath() {
  return store.path;
}
