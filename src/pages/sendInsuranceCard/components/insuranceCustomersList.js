import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Table, Pagination } from "react-bootstrap";

export const InsuranceCustomersList = ({ customers, onSelectCustomer }) => {
  const { t } = useTranslation("SendInsuranceCard");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = customers.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(customers.length / itemsPerPage);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th className="form-col th-name">{t("Name")}</th>
            <th className="th-email">{t("Email")}</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((customer) => (
            <tr
              className="body-l"
              key={customer.insuranceID}
              onClick={() => onSelectCustomer(customer)}
            >
              <td className="form-col td-name">{customer.name}</td>
              <td className="td-email">{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-end">
        {[...Array(totalPages)].map((_, index) => {
          const itemId = `pagination-item-${index + 1}`;
          return (
            <Pagination.Item
              className="body-m-bold"
              key={itemId}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          );
        })}
      </Pagination>
    </>
  );
};

InsuranceCustomersList.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      insuranceID: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ),
  onSelectCustomer: PropTypes.func.isRequired,
};

InsuranceCustomersList.defaultProps = {
  customers: [],
};
