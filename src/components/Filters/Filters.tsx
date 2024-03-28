import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormGroup,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Category, Product } from "../../types/schema.type";
import styled from "styled-components";

const StyledWrapper = styled.div`
  max-width: 250px;
  padding: 2rem;
  border: 1px solid #e0e0e0;
`;

const StyledFilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const StyledFormField = styled(FormGroup)`
  gap: 2rem;
  height: 80%;
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15rem;

  button {
    width: 100%;
  
  }
`;

const StyledMenuItem = styled(MenuItem)`
  text-transform: capitalize;
`

export const Filters = ({
  products,
  categories,
  onChangeCategory,
  onChangeProduct,
  disableProductSelect,
  onClear,
  onRun,
  disableEdit,
  appliedFilters,
}: {
  products: Array<Product>;
  categories: Array<Category>;
  onChangeCategory: (category: string) => void;
  onChangeProduct: (product: Array<Product["id"]>) => void;
  disableProductSelect: boolean;
  onRun: () => void;
  onClear: () => void;
  disableEdit: boolean;
  appliedFilters: {
    category: string;
    products: Array<Product["id"]>;
  };
}) => {
  const { category: selectedCategory, products: selectedProducts } =
    appliedFilters;
  const onProductChange = (event: SelectChangeEvent<unknown>) => {
    onChangeProduct(event.target.value as Array<Product["id"]>);
  };
  return (
    <StyledWrapper className="filters">
      <StyledFilterHeader>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        <Button
          variant="text"
          startIcon={<CloseIcon />}
          onClick={onClear}
          disabled={disableEdit}
        >
          Clear
        </Button>
      </StyledFilterHeader>
      <StyledFormField>
        <FormControl fullWidth>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategory}
            label="Category"
            onChange={(event) => {
              onChangeCategory(event.target.value as string);
            }}
            placeholder="Select Category"
          >
            {categories.map((category) => {
              return (
                <StyledMenuItem key={category} value={category}>
                  {category}
                </StyledMenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="product-select-label">Product</InputLabel>
          <Select
            labelId="product-select-label"
            id="product-select"
            value={selectedProducts}
            label="Product"
            onChange={onProductChange}
            disabled={disableProductSelect}
            placeholder="Select Product(s)"
            multiple
          >
            {products.map((product) => {
              return (
                <MenuItem key={product.id} value={product.id}>
                  {product.title}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </StyledFormField>
      <StyledFooter>
        <Button variant="contained" onClick={onRun} disabled={disableEdit}>
          Run Report
        </Button>
      </StyledFooter>
    </StyledWrapper>
  );
};
