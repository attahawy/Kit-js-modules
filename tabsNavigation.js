export default function tabNavigation() {

    //region tabs navigation
    // Add tab handling script
    // Get tab from URL hash or default to project-details
    let hash = window.location.hash;

    // If no hash, activate first tab
    if (!hash) {
        let firstTab = document.querySelector('#projectTabs .nav-link');
        new bootstrap.Tab(firstTab).show();
    } else {
        // Try to activate tab based on hash
        try {
            let tab = document.querySelector(`#projectTabs button[data-bs-target="${hash}"]`);
            if (tab) {
                new bootstrap.Tab(tab).show();
            }
        } catch (e) {
            console.error('Error activating tab:', e);
        }
    }

    // Update hash on tab change
    document.querySelectorAll('#projectTabs button[data-bs-toggle="pill"]').forEach(tab => {
        tab.addEventListener('shown.bs.tab', function(e) {
            history.replaceState(null, null, e.target.getAttribute('data-bs-target'));
        });
    });
    //endregion handle tabs navigation
}
