/* eslint-disable functional/immutable-data */
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
import { CustomDrawer } from "../components/modals/CustomDrawer";
import InformationModal from "../components/modals/InformationModal";
import PageContainer from "../components/PageContent/PageContainer";
import SkeletonFieldContainer from "../components/Skeletons/SkeletonFieldContainer";
import ClickableFieldContainer from "../components/TextFormField/ClickableFieldContainer";
import FieldContainer from "../components/TextFormField/FieldContainer";
import PspFieldContainer from "../components/TextFormField/PspFieldContainer";
import {
  PaymentCheckData,
  PaymentEmailFormFields,
  PspList,
  Wallet,
} from "../features/payment/models/paymentModel";
import { moneyFormat } from "../utils/form/formatters";
import { loadState, SessionItems } from "../utils/storage/sessionStorage";
import pagopaLogo from "../assets/images/pagopa-logo.svg";

const defaultStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderColor: "divider",
  pt: 1,
  pb: 1,
};

const pspContainerStyle = {
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 2,
  pl: 3,
  pr: 3,
  mb: 2,
};

export default function PaymentCheckPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [pspList, setPspList] = React.useState<Array<PspList>>([]);

  const checkData = useSelector((state: RootState) => {
    if (!state.checkData.idPayment) {
      const data = loadState(SessionItems.checkData) as PaymentCheckData;
      return {
        amount: {
          currency: data?.amount?.currency || "",
          amount: data?.amount?.amount || 0,
          decimalDigits: data?.amount?.decimalDigits || 0,
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
        detailsList: data?.detailsList || [],
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
      return <CreditCardIcon color="action" />;
    }
    return (
      <SvgIcon color="action">
        <use
          href={sprite + `#icons-${wallet.creditCard.brand.toLowerCase()}-mini`}
        />
      </SvgIcon>
    );
  };

  const onPspEditClick = () => {
    setDrawerOpen(true);
    setLoading(true);
    // change settimeout with api binding
    setTimeout(() => {
      setPspList(
        [
          {
            name: "Poste Italiane",
            image: pagopaLogo,
            commission: 500,
            label: "",
            idPsp: 1,
          },
          {
            name: "Unicredit SPA",
            image: pagopaLogo,
            commission: 200,
            label: "",
            idPsp: 1,
          },
          {
            name: "Intesa Sanpaolo spa",
            image: pagopaLogo,
            commission: 300,
            label: "",
            idPsp: 1,
          },
        ].sort((a, b) => (a.commission > b.commission ? 1 : -1))
      );
      setLoading(false);
    }, 3000);
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
          pl: 3,
          pr: 1,
        }}
        endAdornment={
          <Button
            variant="text"
            onClick={() => navigate(-1)}
            startIcon={<EditIcon />}
          >
            {t("clipboard.edit")}
          </Button>
        }
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
          <Button
            variant="text"
            onClick={onPspEditClick}
            startIcon={<EditIcon />}
          >
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
        handleCancel={() => {}}
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

      <CustomDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box
          sx={{
            pt: 1,
            pb: 1,
            mb: 2,
          }}
        >
          <Typography variant="h6" component={"div"}>
            {t("paymentCheckPage.drawer.title")}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
            {t("paymentCheckPage.drawer.body")}
          </Typography>
          <Box
            sx={{
              ...defaultStyle,
              borderBottom: "1px solid",
              borderBottomColor: "divider",
              pt: 3,
              pb: 2,
            }}
          >
            <Typography variant={"caption-semibold"} component={"div"}>
              {t("paymentCheckPage.drawer.header.name")}
            </Typography>
            <Typography variant={"caption-semibold"} component={"div"}>
              {t("paymentCheckPage.drawer.header.amount")}
            </Typography>
          </Box>
        </Box>
        {loading
          ? Array(3)
              .fill(1)
              .map((_, index) => (
                <SkeletonFieldContainer key={index} sx={pspContainerStyle} />
              ))
          : pspList.map((psp, index) => (
              <PspFieldContainer
                key={index}
                titleVariant="sidenav"
                bodyVariant="body2"
                image={psp.image}
                body={psp.name}
                sx={{ ...pspContainerStyle, cursor: "pointer" }}
                endAdornment={
                  <Typography
                    variant={"button"}
                    color="primary"
                    component={"div"}
                  >
                    {moneyFormat(psp.commission)}
                  </Typography>
                }
                onClick={() => {
                  // call change psp api
                }}
              />
            ))}
      </CustomDrawer>
    </PageContainer>
  );
}
