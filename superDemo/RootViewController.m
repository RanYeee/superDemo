//
//  RootViewController.m
//  SuperDemo
//
//  Created by IMac on 16/4/8.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "RootViewController.h"
#import "MainViewCell.h"
#import "MaterTopView.h"
#import "RootDetailViewController.h"


@interface RootViewController ()<UITableViewDelegate,UITableViewDataSource,UINavigationControllerDelegate>

@property (strong,nonatomic) UITableView *tableView;

@property (copy,nonatomic) NSMutableArray *controllerArr;

@property (nonatomic,strong) MaterTopView *topView;

@end

@implementation RootViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    if (self.controllerArray) {
        
        _controllerArr = [NSMutableArray arrayWithArray:self.controllerArray];
        
    }else{
        
        NSString *plistPath = [[NSBundle mainBundle] pathForResource:@"ControllerList" ofType:@"plist"];
        
        _controllerArr = [[NSMutableArray alloc]initWithContentsOfFile:plistPath];

    }
    
    self.topView = [[MaterTopView alloc]initWithFrame:CGRectMake(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT/2.5)];
    
    self.topView.mainTitle = @"Super Demo";
    
    self.topView.detailTitle = @"My personal project";
    
    
    [self.view addSubview: self.topView];
    
    self.tableView = [[UITableView alloc]initWithFrame:self.view.bounds style:UITableViewStylePlain];
    
    self.tableView.delegate = self;
    
    self.tableView.dataSource = self;
    
    self.tableView.contentInset = UIEdgeInsetsMake(self.topView.height - 40, 0, 0, 0);

//    [self.tableView setTableHeaderView:self.topView];
//    self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    
    
    
    [self.view insertSubview:self.tableView belowSubview:self.topView];

//    self.navigationController.delegate = self;

}


-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    
    [self.navigationController setNavigationBarHidden:YES animated:animated];
    
}

- (void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    
    [self.navigationController setNavigationBarHidden:NO animated:animated];
}

#pragma mark - UINavigationControllerDelegate// 将要显示控制器
//- (void)navigationController:(UINavigationController *)navigationController willShowViewController:(UIViewController *)viewController animated:(BOOL)animated {
//    // 判断要显示的控制器是否是自己
//    BOOL isShowHomePage = [viewController isKindOfClass:[self class]];
//    [self.navigationController setNavigationBarHidden:isShowHomePage animated:YES];
//}

#pragma mark - tabelView delegate & dataSource

//-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView{
//    
//    return 1;
//}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    
    return _controllerArr.count;
}

-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    
    static NSString *cellId = @"cellID";
    
    MainViewCell *cell = nil;
    
    cell = [tableView dequeueReusableCellWithIdentifier:cellId];
    
    if (!cell) {
        
        cell = [MainViewCell loadFromXib];
    }
    
    
    cell.selectionStyle = UITableViewCellSelectionStyleNone;
    
//    NSString *decText = [NSString stringWithFormat:@"[%d]  %@",indexPath.row+1,[_controllerArr[indexPath.row] objectForKey:@"dec"]];
    
    NSString *decText = [NSString stringWithFormat:@"%@",[_controllerArr[indexPath.row] objectForKey:@"dec"]];
    
    NSString *createTime = [NSString stringWithFormat:@"%@",[_controllerArr[indexPath.row] objectForKey:@"createTime"]];
//
//    cell.textLabel.text = decText;
//    
//    if (_controllerArr[indexPath.row][@"classArray"]) {
//        
//        cell.detailTextLabel.text = @"...";
//    }
    cell.mainTitleLabel.text = decText;
    
    cell.detailTitleLabel.text = createTime;

    return cell;
}

-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
    
    return 90;
}

//-(CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section{
//    
//}

-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{
    
    if ([_controllerArr[indexPath.row]objectForKey:@"className"]) {
        
        NSString *className = [_controllerArr[indexPath.row]objectForKey:@"className"];

        
        if ([_controllerArr[indexPath.row]objectForKey:@"storyBoard"]) {
            
            NSString *storyBoardName = [_controllerArr[indexPath.row]objectForKey:@"storyBoard"];
            
            UIStoryboard *storyBoard = [UIStoryboard storyboardWithName:storyBoardName bundle:nil];
            
            UIViewController *rootVC = [storyBoard instantiateViewControllerWithIdentifier:className];
            
            [self presentViewController:rootVC animated:YES completion:nil];
            
        }else{
            
            Class controllerClass = NSClassFromString(className);
            
            id nextVC = [[controllerClass alloc]init];
            
            [self.navigationController pushViewController:nextVC animated:YES];
        }

    
    }
    
    if([_controllerArr[indexPath.row]objectForKey:@"classArray"]) {
        
        RootDetailViewController *detailVC = [[RootDetailViewController alloc]init];
        
        detailVC.dataArray = [_controllerArr[indexPath.row]objectForKey:@"classArray"];
        
        detailVC.title = [_controllerArr[indexPath.row]objectForKey:@"dec"];
        
        [self.navigationController pushViewController:detailVC animated:YES];
        
        
    }
    
    else{
        
        return;
    }

}

#pragma mark - scrollViewDelegate

-(void)scrollViewDidScroll:(UIScrollView *)scrollView{
    
    
    [self.topView reloadViewWithScrollView:scrollView];
    
}

@end
