    /*********
      * @note visits are not installation visits
      * by default hide #visit_reason
      * @link this is used in project.php follow-up tab
      *******/
export default function followupForm() {
    //region followup form

    $('#followup_visit_reason').hide();
    // on selected call
    $('#followup_type_call').on('click', function () {
        $('#followup_meet_location').hide();
        $('#followup_visit_reason').hide();
        $('#followup_sms_note').hide();
        $('#followup_visit_reason_select').prop('required', false);
        $('#followup_meet_location_select').prop('required', false);
    });
    // on selected visit
    $('#followup_type_visit').on('click', function () {
        $('#followup_meet_location').hide();
        $('#followup_visit_reason').show();
        $('#followup_sms_note').show();
        $('#followup_visit_reason_select').prop('required', true);
        $('#followup_meet_location_select').prop('required', false);
    });
    // on selected meet
    $('#followup_type_meet').on('click', function () {
        $('#followup_meet_location').show();
        $('#followup_visit_reason').hide();
        $('#followup_sms_note').show();
        $('#followup_visit_reason_select').prop('required', false);
        $('#followup_meet_location_select').prop('required', true);
    });
    //endregion followup form
}