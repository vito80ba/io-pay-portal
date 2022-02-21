/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/no-empty-function */
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Box, SvgIcon, Typography } from "@mui/material";
import { default as React } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { RootState } from "../app/store";
import sprite from "../assets/images/app.svg";
import { FormButtons } from "../components/FormButtons/FormButtons";
import PageContainer from "../components/PageContent/PageContainer";
import ClickableFieldContainer from "../components/TextFormField/ClickableFieldContainer";
import FieldContainer from "../components/TextFormField/FieldContainer";
import {
  PaymentCheckData,
  Wallet,
} from "../features/payment/models/paymentModel";
import { moneyFormat } from "../utils/form/formatters";
import { loadState, SessionItems } from "../utils/storage/sessionStorage";

const defaultStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderColor: "divider",
  pt: 1,
  pb: 1,
};

export default function PaymentCheckPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [modalOpen, setModalOpen] = React.useState(false);
  const checkData = useSelector((state: RootState) => {
    if (!state.checkData.idPayment) {
      const data = loadState(SessionItems.checkData) as PaymentCheckData;
      return {
        amount: {
          currency: data?.amount?.currency || "EUR",
          amount: data?.amount?.amount || 17300,
          decimalDigits: data?.amount?.decimalDigits || 2,
        },
        bolloDigitale: data?.bolloDigitale || false,
        fiscalCode: data?.fiscalCode || "",
        iban: data?.iban || "",
        id: data?.id || 0,
        idPayment: data?.idPayment || "",
        isCancelled: data?.isCancelled || false,
        origin: data?.origin || "",
        receiver: data?.receiver || "",
        subject: data?.subject || "",
        urlRedirectEc: data?.urlRedirectEc || "",
        detailsList: data?.detailsList || [
          {
            importo: 100,
          },
        ],
      };
    }
    return state.checkData;
  });
  const wallet = useSelector((state: RootState) => {
    if (!state.wallet.idWallet) {
      const data = loadState(SessionItems.wallet) as Wallet;
      return {
        creditCard: {
          brand: data?.creditCard?.brand || "mastercard",
          pan: data?.creditCard?.pan || "**********4242",
          holder: data?.creditCard?.holder || "Mario Rossi",
          expireMonth: data?.creditCard?.expireMonth || "09",
          expireYear: data?.creditCard?.expireYear || "26",
        },
        idWallet: data?.idWallet || 0,
        psp: {
          businessName: data?.psp?.businessName || "",
          directAcquire: data?.psp?.directAcquire || false,
          fixedCost: {
            currency: data?.psp?.fixedCost?.currency || "",
            amount: data?.psp?.fixedCost?.amount || 0,
            decimalDigits: data?.psp?.fixedCost?.decimalDigits || 0,
          },
          logoPSP: data?.psp?.logoPSP || "",
          serviceAvailability: data?.psp?.serviceAvailability || "",
        },
        pspEditable: data?.pspEditable || false,
        type: data?.type || "",
      };
    }
    return state.wallet;
  });

  const onSubmit = React.useCallback(() => {}, []);
  const getWalletIcon = () => {
    if (
      !wallet.creditCard.brand ||
      wallet.creditCard.brand.toLowerCase() === "other"
    ) {
      return <CreditCardIcon color="action" sx={{ ml: 3 }} />;
    }
    return (
      <SvgIcon sx={{ ml: 3 }} color="action">
        <use
          href={sprite + `#icons-${wallet.creditCard.brand.toLowerCase()}-mini`}
        />
      </SvgIcon>
    );
  };

  return (
    <PageContainer>
      <Box
        sx={{
          ...defaultStyle,
          borderBottom: "1px solid",
          borderBottomColor: "divider",
        }}
      >
        <Typography variant="h6" component={"div"} pr={2}>
          {t("paymentCheckPage.total")}
        </Typography>
        <Typography variant="h6" component={"div"}>
          {moneyFormat(checkData.amount.amount)}
        </Typography>
      </Box>
      <ClickableFieldContainer
        title="paymentCheckPage.creditCard"
        icon={<CreditCardIcon sx={{ color: "text.primary" }} />}
        clickable={false}
        sx={{ borderBottom: "", mt: 2 }}
        itemSx={{ pl: 0, pr: 0 }}
      />
      <FieldContainer
        titleVariant="sidenav"
        bodyVariant="body2"
        title={`· · · · ${wallet.creditCard.pan.slice(-4)}`}
        body={`${wallet.creditCard.expireMonth}/${wallet.creditCard.expireYear} · ${wallet.creditCard.holder}`}
        icon={getWalletIcon()}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      />

      <ClickableFieldContainer
        title="paymentCheckPage.transaction"
        icon={<LocalOfferIcon sx={{ color: "text.primary" }} />}
        clickable={false}
        sx={{ borderBottom: "", mt: 2 }}
        itemSx={{ pl: 0, pr: 0 }}
      />
      <FieldContainer
        titleVariant="sidenav"
        bodyVariant="body2"
        title={moneyFormat(
          checkData?.detailsList?.length ? checkData.detailsList[0].importo : 0
        )}
        body={"paymentCheckPage.psp"}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          pl: 3,
        }}
      />

      <FormButtons
        submitTitle="paymentCheckPage.buttons.submit"
        cancelTitle="paymentCheckPage.buttons.cancel"
        disabled={false}
        loading={false}
        handleSubmit={onSubmit}
        handleCancel={() => {
          navigate(-1);
        }}
      />
    </PageContainer>
  );
}
