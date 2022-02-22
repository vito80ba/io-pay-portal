/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/no-empty-function */
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EditIcon from "@mui/icons-material/Edit";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Box, Button, SvgIcon, Typography } from "@mui/material";
import { default as React } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../app/store";
import sprite from "../assets/images/app.svg";
import { FormButtons } from "../components/FormButtons/FormButtons";
import InformationModal from "../components/modals/InformationModal";
import PageContainer from "../components/PageContent/PageContainer";
import ClickableFieldContainer from "../components/TextFormField/ClickableFieldContainer";
import FieldContainer from "../components/TextFormField/FieldContainer";
import {
  PaymentCheckData,
  PaymentEmailFormFields,
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
          businessName:
            data?.psp?.businessName || "Banca Monte dei Paschi di Siena",
          directAcquire: data?.psp?.directAcquire || false,
          fixedCost: {
            currency: data?.psp?.fixedCost?.currency || "EUR",
            amount: data?.psp?.fixedCost?.amount || 100,
            decimalDigits: data?.psp?.fixedCost?.decimalDigits || 2,
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

  const email = useSelector((state: RootState) => {
    if (!state.email.email) {
      const data = loadState(SessionItems.email) as PaymentEmailFormFields;
      return {
        email: data?.email || "",
        confirmEmail: data?.confirmEmail || "",
      };
    }
    return state.email;
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
        itemSx={{ pl: 0, pr: 0, gap: 2 }}
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
        itemSx={{ pl: 0, pr: 0, gap: 2 }}
        endAdornment={
          <InfoOutlinedIcon
            sx={{ color: "primary.main", cursor: "pointer" }}
            fontSize="medium"
            onClick={() => {
              setModalOpen(true);
            }}
          />
        }
      />
      <FieldContainer
        titleVariant="sidenav"
        bodyVariant="body2"
        title={moneyFormat(wallet.psp.fixedCost.amount)}
        body={`${t("paymentCheckPage.psp")} ${wallet.psp.businessName}`}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          pl: 3,
          pr: 1,
        }}
        endAdornment={
          <Button variant="text" onClick={() => {}} startIcon={<EditIcon />}>
            {t("clipboard.edit")}
          </Button>
        }
      />
      <ClickableFieldContainer
        title={`${t("paymentCheckPage.email")} ${email.email}`}
        icon={<MailOutlineIcon sx={{ color: "text.primary" }} />}
        clickable={false}
        sx={{ borderBottom: "", mt: 2 }}
        itemSx={{ pl: 2, pr: 0, gap: 2 }}
      />

      <FormButtons
        submitTitle={`${t("paymentCheckPage.buttons.submit")} ${moneyFormat(
          checkData.amount.amount
        )}`}
        cancelTitle="paymentCheckPage.buttons.cancel"
        disabled={false}
        loading={false}
        handleSubmit={onSubmit}
        handleCancel={() => {
          navigate(-1);
        }}
      />
      <InformationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="sm"
        content="alternative"
      >
        <Typography variant="h6" component={"div"} sx={{ pb: 2 }}>
          {t("paymentCheckPage.modal.title")}
        </Typography>
        <Typography
          variant="body1"
          component={"div"}
          sx={{ whiteSpace: "pre-line" }}
        >
          {t("paymentCheckPage.modal.body")}
        </Typography>
      </InformationModal>
    </PageContainer>
  );
}
