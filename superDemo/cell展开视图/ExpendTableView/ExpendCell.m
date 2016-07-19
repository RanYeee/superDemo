//
//  ExpendCell.m
//  myApp
//
//  Created by IMac on 16/4/6.
//  Copyright © 2016年 IMac. All rights reserved.
//

#import "ExpendCell.h"
#import "FormView.h"
#import "KLFormHeaderView.h"
#import "ThreeItemView.h"
#import "TwoItemView.h"

@interface ExpendCell ()

@end

@implementation ExpendCell

- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

+ (instancetype)creatWithTitle :(NSString *)title inTableView :(UITableView *)tableView section:(NSInteger)section
{
    ExpendCell *cell = [tableView dequeueReusableCellWithIdentifier:NSStringFromClass(self)];
//    [self loadViewWithSection:section];
    if (!cell) {
        
        cell = [[NSBundle mainBundle] loadNibNamed:NSStringFromClass(self) owner:self options:nil].firstObject;
    }
    [cell loadViewWithSection:section title:title];
    return cell;
}

- (void)loadViewWithSection:(NSInteger)section title:(NSString *)title{
    NSLog(@"section %ld",section);
    
    [self.contentView removeAllSubviews];

    if (section == 0) {
        FormView *formView = [FormView creatFormView];
        formView.frame = self.contentView.bounds;
        [self.contentView addSubview:formView];
    }else if (section == 1){
        KLFormHeaderView *bloodSugarView = [KLFormHeaderView makeFormHeaderView];
        bloodSugarView.frame = self.contentView.bounds;
        [self.contentView addSubview:bloodSugarView];
    }else if (section == 7){
        ThreeItemView *itemView = [ThreeItemView creatThreeItemView];
        itemView.frame = self.contentView.bounds;
        [self.contentView addSubview:itemView];
    }
    else{
        TwoItemView *twoView = [TwoItemView creatTwoItewmView];
        twoView.titleLabel.text = title;
        twoView.frame = self.contentView.bounds;
        [self.contentView addSubview:twoView];
    }
    
}

- (void)jj{
    
}

@end
