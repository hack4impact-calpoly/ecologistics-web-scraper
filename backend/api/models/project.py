class Project:
    def __init__(
        self,
        county_file_number,
        hearing_date,
        review_status,
        location,
        apn,
        date_accepted,
        requesting_party,
        sch_number,
        title,
        public_hearing_agenda_link,
        sch_page_link,
        additional_notes,
    ):
        self.county_file_number = county_file_number
        self.hearing_date = hearing_date
        self.review_status = review_status
        self.location = location
        self.apn = apn
        self.date_accepted = date_accepted
        self.requesting_party = requesting_party
        self.sch_number = sch_number
        self.title = title
        self.public_hearing_agenda_link = public_hearing_agenda_link
        self.sch_page_link = sch_page_link
        self.additional_notes = additional_notes

    def to_dict(self):
        return {
            "county_file_number": self.county_file_number,
            "hearing_date": self.hearing_date,
            "review_status": self.review_status,
            "location": self.location,
            "apn": self.apn,
            "date_accepted": self.date_accepted,
            "requesting_party": self.requesting_party,
            "sch_number": self.sch_number,
            "title": self.title,
            "public_hearing_agenda_link": self.public_hearing_agenda_link,
            "sch_page_link": self.sch_page_link,
            "additional_notes": self.additional_notes,
        }
