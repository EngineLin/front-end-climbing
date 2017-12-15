export default function fachUserData() {
  return store => {
    store.subscribe((mutation, state) => {
      console.log('mutation')
      console.log(mutation)
      if (mutation.type === 'router/ROUTE_CHANGED') {
        store.dispatch('updateAccountData');
      }
    })
  }
}