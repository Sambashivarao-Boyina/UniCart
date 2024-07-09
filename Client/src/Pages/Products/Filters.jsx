import React,{useState,useEffect} from 'react'
import { 
    Drawer,
    Button,
    IconButton,
    Typography, 
    Card,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,} from '@material-tailwind/react';
import {
    RectangleGroupIcon,
    CurrencyDollarIcon,
    AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { propTypesDisabled } from '@material-tailwind/react/types/components/accordion';


export default function Filters({open,closeDrawer,list,handleList,products,setProducts,dataBaseProducts,highestPrice,lowestPrice}) {

    //filters

    //category filters
    const [categories,setCatergories]=useState(new Set());

    const defaultCategories=[
        'beauty',             'fragrances',
        'furniture',          'groceries',
        'home-decoration',    'kitchen-accessories',
        'laptops',            'mens-shirts',
        'mens-shoes',         'mens-watches',
        'mobile-accessories', 'motorcycle',
        'skin-care',          'smartphones',
        'sports-accessories', 'sunglasses',
        'tablets',            'tops',
        'vehicle',            'womens-bags',
        'womens-dresses',     'womens-jewellery',
        'womens-shoes',       'womens-watches',
        "other"
      ];

    const handleCategoryChange = (event)=>{
        if(categories.has(event.target.value)){
            setCatergories((prev)=>{
                let newSet=new Set(prev);
                newSet.delete(event.target.value);
                return newSet;
            });
        }else{
            setCatergories(prev=>{
                let newSet=new Set(prev);
                newSet.add(event.target.value);
                return newSet;
            });
        }

        
    }

    useEffect(()=>{
       
        setProducts((prev)=>{
            return dataBaseProducts.filter((item)=>categories.has(item.category));
        })
            
        if(categories==null ||categories.size==0){
            setProducts(dataBaseProducts);
        }
        // updatePriceRanges();
    },[categories])

    
    
    
   

    const [minPrice,setMinPrice]=useState(null);
    const [maxPrice,setMaxPrice]=useState(highestPrice);

    const handleMinPrice=(event)=>{
        if(event.target.value<maxPrice){
            setMinPrice(event.target.value);
        }
    }
    const handleMaxPrice=(event)=>{
        if(event.target.value>minPrice){
            setMaxPrice(event.target.value);
        }
    }

    useEffect(()=>{
        let min=Math.min(minPrice,maxPrice);
        let max=Math.max(minPrice,maxPrice);

        setProducts((prev)=>{
            return dataBaseProducts.filter((item)=>categories.has(item.category));
        })
            
        if(categories==null ||categories.size==0){
            setProducts((prev)=>dataBaseProducts);
        }

        setProducts((prev)=>{
            return prev.filter((item)=> item.actualPrice >= min && item.actualPrice <= max);
        })
    },[minPrice,maxPrice])


    //sort filters

    const [sort,setSort]=useState(null);
    const handleSortChange=(event)=>{
        setSort(event.target.value);
    }


    useEffect(()=>{
        if(sort=="priceLowToHigh"){
            setProducts((prev)=>{
                return prev.sort((a,b)=>a.actualPrice-b.actualPrice);
            });
        }else if(sort ==="priceHighToLow"){
            setProducts((prev)=>{
                return prev.sort((a,b)=>b.actualPrice-a.actualPrice);
            });
        }else if(sort === "newToOld"){
            setProducts((prev)=>{
                return prev.sort((a,b)=>new Date(a.updatedAt) - new Date(b.updatedAt));
            });
        }else if(sort === "oldToNew"){
            setProducts((prev)=>{
                return prev.sort((a,b)=>new Date(b.updatedAt) - new Date(a.updatedAt));
            });
        }
    },[sort])

    //clear filters

    const handleClearFilters = ()=>{
        setCatergories(new Set());
        setMinPrice(0);
        setMaxPrice(highestPrice);
        setSort(null);
        setProducts(dataBaseProducts);
    }


    return (
        <React.Fragment>
            <Drawer open={open} onClose={closeDrawer} className="p-4" placement='right'>
                <div className="mb-6 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray">
                        Add Filters
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer} >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-5 w-5"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                        </svg>
                    </IconButton>
                </div>
                <div>
                    <List>
                        <Accordion
                        open={list === 1}
                        icon={
                            <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""} `}
                            />
                        }
                        >
                            <ListItem className="p-0" selected={list === 1}>
                                <AccordionHeader onClick={() => handleList(1)} className="border-b-0 p-3">
                                    <ListItemPrefix>
                                        <CurrencyDollarIcon className="h-5 w-5 text-[#4A00FF]" />
                                    </ListItemPrefix>
                                    <Typography color="blue-gray" className="mr-auto font-normal">
                                        Price Range
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1">
                                {
                                    dataBaseProducts && dataBaseProducts.length ?
                                        <>  
                                            <p>Min Price : ${ Math.round(minPrice) }</p>
                                            <input type="range" min={lowestPrice} max={highestPrice} name="min-price" value={minPrice} defaultValue={0} onChange={handleMinPrice}  className="range range-primary range-xs" step={10}/>
                                            <p>Max Price : ${ Math.round(maxPrice) }</p>
                                            <input type="range" min={lowestPrice} max={highestPrice} name="max-price" value={maxPrice} defaultValue={highestPrice} onChange={handleMaxPrice} className="range range-primary  range-xs" step={10}/>
                                        </>
                                    :null
                                }
                            </AccordionBody>
                        </Accordion>


                        <Accordion
                        open={list === 2}
                        icon={
                            <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${list === 2 ? "rotate-180" : ""}`}
                            />
                        }
                        >
                            <ListItem className="p-0" selected={list === 2}>
                                <AccordionHeader onClick={() => handleList(2)} className="border-b-0 p-3">
                                    <ListItemPrefix>
                                        <RectangleGroupIcon className="h-5 w-5 text-[#4A00FF]" />
                                    </ListItemPrefix>
                                    <Typography color="blue-gray" className="mr-auto font-normal">
                                        Catergories
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1">
                                <List className="p-0 max-h-60 overflow-scroll">
                                    
                                    {
                                        defaultCategories && defaultCategories.length ?
                                            defaultCategories.map((item,idx)=>{
                                                return (<label className="label cursor-pointer -my-4" htmlFor={idx} >
                                                    <ListItem >
                                                        <ListItemPrefix>
                                                            <input type="checkbox" value={item} checked={categories.has(`${item}`)}  className="checkbox checkbox-primary" id={idx} onClick={handleCategoryChange} />
                                                        </ListItemPrefix>
                                                        <span className="label-text capitalize">{item}</span>
                                                    </ListItem>
                                                </label>)
                                            })
                                        :null
                                    }
                                   
                                </List>
                                

                            </AccordionBody>
                        </Accordion>
                        
                        <Accordion
                        open={list === 3}
                        icon={
                            <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""} `}
                            />
                        }
                        >
                            <ListItem className="p-0" selected={list === 3}>
                                <AccordionHeader onClick={() => handleList(3)} className="border-b-0 p-3">
                                    <ListItemPrefix>
                                        <AdjustmentsHorizontalIcon className="h-5 w-5 text-[#4A00FF]" />
                                    </ListItemPrefix>
                                    <Typography color="blue-gray" className="mr-auto font-normal">
                                        Sort By
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1">
                                
                                <label className="label cursor-pointer -my-4" htmlFor="priceLowToHigh" >
                                    <ListItem >
                                        <ListItemPrefix>
                                            <input type="radio" value="priceLowToHigh" name="sort" className="radio radio-primary" id="priceLowToHigh" onChange={handleSortChange}/>
                                        </ListItemPrefix>
                                        <span className="label-text capitalize">Price Low to High</span>
                                    </ListItem>
                                </label>
                                <label className="label cursor-pointer -my-4" htmlFor="priceHighToLow" >
                                    <ListItem >
                                        <ListItemPrefix>
                                            <input type="radio" value="priceHighToLow" name="sort" className="radio radio-primary" id="priceHighToLow" onChange={handleSortChange}/>
                                        </ListItemPrefix>
                                        <span className="label-text capitalize">Price High to Low</span>
                                    </ListItem>
                                </label>
                                <label className="label cursor-pointer -my-4" htmlFor="newToOld" >
                                    <ListItem >
                                        <ListItemPrefix>
                                            <input type="radio" value="newToOld" name="sort" className="radio radio-primary" id="newToOld" onChange={handleSortChange}/>
                                        </ListItemPrefix>
                                        <span className="label-text capitalize">New To Old</span>
                                    </ListItem>
                                </label>
                                <label className="label cursor-pointer -my-4" htmlFor="oldToNew" >
                                    <ListItem >
                                        <ListItemPrefix>
                                            <input type="radio" value="oldToNew" name="sort" className="radio radio-primary" id="oldToNew" onChange={handleSortChange}/>
                                        </ListItemPrefix>
                                        <span className="label-text capitalize">Old To New</span>
                                    </ListItem>
                                </label>
                                
                            </AccordionBody>
                        </Accordion>
                        <button onClick={handleClearFilters} class="btn btn-outline btn-primary">Clear Filters</button>

                    </List>
                </div>
                
            </Drawer>
        </React.Fragment>
    )
}
