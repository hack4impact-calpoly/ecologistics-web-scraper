import unittest
from unittest.mock import patch, MagicMock
from api.utils.slo_county.scrape_hearings import scrape_hearings


class TestScrapeHearings(unittest.TestCase):
    @patch("requests.get")
    def test_scrape_hearings(self, mock_get):
        # mock requests.get() to replace requests.get(url)
        # now the test won't hit the actual website
        mock_response = MagicMock()
        mock_response.content = b'<html><body><table class="listingTable"><tr><td class="listItem" headers="ItemDocumentsUpcoming"><a href="https://agenda.slocounty.ca.gov/iip/sanluisobispo/meeting/details/1698">Item Documents</a></td></tr></table></body></html>'  # noqa: E501

        # setting the return value of requests.get(url) to the
        # predefined value above
        mock_get.return_value = mock_response

        expected_links = scrape_hearings()

        # ensure scrape_hearings() returns the correct links
        self.assertEqual(
            expected_links,
            ["https://agenda.slocounty.ca.gov/iip/sanluisobispo/meeting/details/1698"],  # noqa: E501
        )


if __name__ == "__main__":
    unittest.main()
